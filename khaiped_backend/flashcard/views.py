from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from word.serializers import WordSerializer, WordRootSerializer
from database.models import Word, WordLearned, WordRoot
import random

class FlashcardAPIView(APIView):
    def get(self, request):
        learned = request.GET.get('l')
        learned = learned.lower() == 'true'

        if request.user.is_authenticated and learned:
            words = Word.objects.all()
        else:
            learned_words = WordLearned.objects.filter(user_id=request.user).values_list('word_id', flat=True)
            words = Word.objects.exclude(id__in=learned_words)
            if words.count() < 5:
                words = Word.objects.all()

        random_words = random.sample(list(words), 5)
        word_ids = [word.id for word in random_words]

        if word_ids:
            return Response({'word_ids': word_ids}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No words available."}, status=status.HTTP_204_NO_CONTENT)
