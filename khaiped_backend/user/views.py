# from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from .serializers import UserRegisterSerializer, UserLogInSerializer, UserSerializer
from database.models import Word, WordLearned, User
from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404
from django.db.models import F

# from rest_framework.authtoken.models import Token

# Create your views here.
class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class UserLogInView(APIView):
    def post(self, request):
        serializer = UserLogInSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.check_user(request.data)
            login(request, user)
            if not user.is_login:
                user.score += 100
                user.is_login = True
                user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogOutView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    def get(self, request):
        serializer = UserSerializer(request.user)
        user = request.user
        if not user.is_login:
            user.score += 100
            user.is_login = True
            user.save()
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    
class SessionDataView(APIView):
    def get(self, request):
        session_data = {}
        if request.session:
            # Retrieve session data
            session_data['session_id'] = request.session.session_key
            session_data['user_id'] = request.session.get('user_id', None)
            session_data['username'] = request.session.get('username', None)
            # Add more session data as needed
        return Response(session_data)
    
class WordLearnedView(APIView):
    def post(self, request):
        word_ids = request.data.get('word_ids', [])
        user = request.user  # Assuming you have user authentication in place
        
        for word_id in word_ids:
            word = get_object_or_404(Word, id=word_id)  # Retrieve the Word instance
            word_learned_exists = WordLearned.objects.filter(user_id=user, word_id=word).exists()
            if not word_learned_exists:
                WordLearned.objects.create(user_id=user, word_id=word)

        return Response({'message': 'Word IDs stored successfully'})
    
def ordinalize(number):
    suffixes = {1: 'st', 2: 'nd', 3: 'rd'}
    if 10 <= number % 100 <= 20:
        suffix = 'th'
    else:
        suffix = suffixes.get(number % 10, 'th')
    return f"{number}{suffix}"

class LeaderboardAPIView(APIView):
    def get(self, request):
        users = User.objects.order_by('-score')  # Retrieve users sorted by score in descending order
        
        # Annotate the queryset with the rank based on the score
        users = users.annotate(rank=F('score'))

        leaderboard = []
        for index, user in enumerate(users, start=1):
            leaderboard.append({
                'rank': ordinalize(index),
                'username': user.username,
                'score': user.score
            })

        return Response(leaderboard)
