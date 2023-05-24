from rest_framework import serializers
from database.models import Word

class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ('id', 'word', 'tran_th', 'tran_eng', 'part_of_speech')