# from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes
# from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegisterSerializer, UserLogInSerializer, UserSerializer
from database.models import Word, WordLearned, User
from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404
from django.db.models import F

# from rest_framework.authtoken.models import Token

# Create your views here.
# class UserRegisterView(APIView):
#     def post(self, request):
#         serializer = UserRegisterSerializer(data = request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(status=status.HTTP_400_BAD_REQUEST)

class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            response_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': serializer.data
            }
            
            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class UserLogInView(APIView):
#     def post(self, request):
#         serializer = UserLogInSerializer(data = request.data)
#         if serializer.is_valid():
#             user = serializer.check_user(request.data)
#             login(request, user)
#             if not user.is_login:
#                 user.score += 100
#                 user.is_login = True
#                 user.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLogInView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            user = User.objects.get(username=request.data['username'])
            user.update_login()
            if not user.is_login:
                user.score += 100
                user.is_login = True
                user.save()
        return response

# class UserLogOutView(APIView):
#     def post(self, request):
#         logout(request)
#         return Response(status=status.HTTP_200_OK)

class UserLogOutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    def get(self, request):
        serializer = UserSerializer(request.user)
        user = request.user
        if user:
            user.reset_quest_status()
        if not user.is_login:
            user.score += 100
            user.is_login = True
            user.save()
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    
# class SessionDataView(APIView):
#     def get(self, request):
#         session_data = {}
#         if request.session:
#             # Retrieve session data
#             session_data['session_id'] = request.session.session_key
#             session_data['user_id'] = request.session.get('user_id', None)
#             session_data['username'] = request.session.get('username', None)
#             # Add more session data as needed
#         return Response(session_data)
    
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])   
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

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])   
class LeaderboardAPIView(APIView):
    def get(self, request):
        users = User.objects.order_by('-score')  # Retrieve users sorted by score in descending order
        
        # Annotate the queryset with the rank based on the score
        users = users.annotate(rank=F('score'))

        leaderboard = []
        current_user = None
        for index, user in enumerate(users, start=1):
            if user == request.user:
                current_user = {
                    'rank': ordinalize(index),
                    'username': user.username,
                    'score': user.score
                }
            leaderboard.append({
                'rank': ordinalize(index),
                'username': user.username,
                'score': user.score
            })

        return Response({'leaderboard': leaderboard, 'current_user': current_user}, status=status.HTTP_200_OK)
