from rest_framework import serializers
from database.models import User

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
    def create(self, data):
        user_obj = User.objects.create_user(username = data['username'], password = data['password'])
        user_obj.save()
        return user_obj
