from rest_framework import serializers
from database.models import User
from django.contrib.auth import authenticate

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
    def create(self, data):
        user_obj = User.objects.create_user(username = data['username'], password = data['password'])
        user_obj.save()
        return user_obj

class UserLogInSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()
    class Meta:
        model = User
        fields = ['username', 'password']
    def check_user(self, data):
        user = authenticate(username = data['username'], password = data['password'])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in.")
    