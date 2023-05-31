from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import WordSerializer, WordRootSerializer
from database.models import Word, WordLearned
import random
from django.db.models import Q

# Create your views here.
class RandomWordView(APIView):
    def get(self, request):
        # allWords = request.GET.get('a')
        # allWords = allWords.lower() == 'true'

        previous_word_id = request.session.get('previous_word_id')

        if request.user.is_authenticated:
            learned_words = WordLearned.objects.filter(user_id=request.user).values_list('word_id', flat=True)
            words = Word.objects.exclude(id__in=learned_words)
            if not words.exists():
                words = Word.objects.all()
        else:
            words = Word.objects.all()
            
        if previous_word_id is not None:
            words = words.exclude(id=previous_word_id)

        if words.exists():
            random_word = random.choice(words)
            serializer = WordSerializer(random_word)

            request.session['previous_word_id'] = random_word.id

            return Response({'word': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No words available."}, status=status.HTTP_204_NO_CONTENT)

class WordDetailView(APIView):
    def get(self, request, pk):
        try:
            # word_data = []
            word = Word.objects.get(pk=pk)
            # serializer = WordSerializer(word)
            word_serializer = WordSerializer(word)
            word_root_serializer = WordRootSerializer(word.root_id)  # Access the WordRoot object through the 'root_id' field
            # word_data.append({'word': word_serializer.data, 'word_root': word_root_serializer.data})

            return Response({'word': word_serializer.data, 'word_root': word_root_serializer.data}, status=status.HTTP_200_OK)
            # return Response({'word': serializer.data}, status=status.HTTP_200_OK)
        except Word.DoesNotExist:
            return Response({"message": "No words available."}, status=status.HTTP_204_NO_CONTENT)
        
class SearchWordView(APIView):
    def get(self, request):
        query =  request.GET.get('q')
        if not query:
            return Response({"message": "Please provide a search query."}, status=status.HTTP_400_BAD_REQUEST)
        result = Word.objects.filter(
            Q(word__icontains=query) | Q(tran_th__icontains=query)
        ).distinct()
        if not result:
            return Response({"message": "No words available."}, status=status.HTTP_204_NO_CONTENT)
        serializer = WordSerializer(result, many = True)        
        return Response({'words': serializer.data}, status=status.HTTP_200_OK)