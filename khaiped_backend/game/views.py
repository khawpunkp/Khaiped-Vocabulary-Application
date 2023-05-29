import random
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from database.models import Word
from word.serializers import WordSerializer

# Create your views here.
class GetGameView(APIView):
    def get(self, request):
        words = Word.objects.all()
        if words.exists():
            random_word = random.choice(words)
            serializer = WordSerializer(random_word)
            return Response({'word': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No words available."}, status=status.HTTP_204_NO_CONTENT)