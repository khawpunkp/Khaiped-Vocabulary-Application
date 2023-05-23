from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import WordSerializer
from database.models import Word, WordLearned
import random

# Create your views here.
class RandomWordView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            learned_words = WordLearned.objects.filter(user_id=request.user).values_list('word_id', flat=True)
            words = Word.objects.exclude(id__in=learned_words)
        else:
            words = Word.objects.all()
        if words.exists():
            random_word = random.choice(words)
            serializer = WordSerializer(random_word)
            return Response({'word': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No words available."}, status=status.HTTP_204_NO_CONTENT)