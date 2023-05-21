from rest_framework import serializers
from database.models import User, WordLearned
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
        fields = ('username', 'password')
    def check_user(self, data):
        user = authenticate(username = data['username'], password = data['password'])
        if user and user.is_active:
            user.update_last_login()
            return user
        raise serializers.ValidationError("Unable to log in.")

class UserSerializer(serializers.ModelSerializer):
    word_learned_count = serializers.SerializerMethodField()

    def get_word_learned_count(self, user):
        return WordLearned.objects.filter(user_id=user).count()

    class Meta:
        model = User
        fields = ('username','game_played', 'quiz_score', 'quiz_taken', 'day_streak', 'word_learned_count')