# from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from .serializers import UserRegisterSerializer, UserLogInSerializer, UserSerializer
from django.contrib.auth import login, logout
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
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogOutView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    
def logout_view(request):
    logout(request)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    def get(self, request):
        serializer = UserSerializer(request.user)
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