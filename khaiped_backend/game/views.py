import random
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from database.models import Word
from word.serializers import WordSerializer

# Create your views here.
class GameAPIView(APIView):
    def get(self, request):
        words = Word.objects.all()
        if words.exists():
            random_word = random.choice(words)
            scrambled_word, index = self.scramble_word(random_word.word)
            serializer = WordSerializer(random_word)
            data = serializer.data
            data['scrambled_word'] = scrambled_word
            data['index'] = index
            return Response({'word': data}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No words available."}, status=status.HTTP_204_NO_CONTENT)
    
    def post(self, request):
        first_attempt  = request.data.get('firstAttempt')
        if first_attempt:
            first_attempt = first_attempt.lower() == 'true'
        user = request.user 
        if user:
            user.game_played += 1
            user.daily_play += 1        
            if not user.is_played and user.daily_play >= 3: # daily quest
                user.score += 300
                user.is_played = True        
            if first_attempt: # bonus score
                user.score += 50        
            user.score += 50 # score
            user.save()
            return Response(status=status.HTTP_200_OK)
    
    def scramble_word(self, word):
        word_list = list(word.upper())
        random.shuffle(word_list)
        scrambled_word = ''.join(word_list)

        index = ''
        letter_counts = {}

        for i, letter in enumerate(word_list):
            # scrambled_word += letter
            if letter in letter_counts:
                letter_counts[letter] += 1
            else:
                letter_counts[letter] = 0

            index += f'{letter_counts[letter]}'

        return scrambled_word, index