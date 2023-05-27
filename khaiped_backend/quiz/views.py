from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import WordSerializer
from database.models import Word, WordLearned
import random

class QuizAPIView(APIView):
    def get(self, request):
        mode = request.GET.get('mode')
        learned = request.GET.get('learned')

        if learned:
            words = Word.objects.all()
        else:
            learned_words = WordLearned.objects.filter(user_id=request.user).values_list('word_id', flat=True)
            words  = Word.objects.exclude(id__in=learned_words)

        if mode == "easy":
            return self.generate_easy_quiz(words)
        elif mode == "hard":
            return self.generate_hard_quiz(words)
        else:
            return Response({"message": "Invalid quiz mode."}, status=400)
        
    def generate_easy_quiz(self, words):
        # if learned:
        #     words = Word.objects.all()
        # else:
        #     learned_words = WordLearned.objects.filter(user_id=user).values_list('word_id', flat=True)
        #     words  = Word.objects.exclude(id__in=learned_words)
        
        word = random.choice(words)
            
        question_type = random.randint(1, 3)
        
        # Question: Word, Answer: tran_th, Dummy Answers: random tran_th
        if question_type == 1:
            question = word.word
            answer = word.tran_th
            dummy_answers = random.sample(list(words.exclude(tran_th=answer).values_list('tran_th', flat=True)), 3)
        
        # Question: tran_th, Answer: Word, Dummy Answers: random word
        elif question_type == 2:
            question = word.tran_th
            answer = word.word
            dummy_answers = random.sample(list(words.exclude(word=answer).values_list('word', flat=True)), 3)
        
        # Question: tran_eng, Answer: Word, Dummy Answers: random word
        else:               
            question = word.tran_eng
            answer = word.word
            dummy_answers = random.sample(list(words.exclude(word=answer).values_list('word', flat=True)), 3)
        choices = [answer] + dummy_answers
        random.shuffle(choices)

        if question and choices:
            return Response({"question": question, "answer": answer, "choices": choices}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
    def generate_hard_quiz(self, words):
        synonyms_type = [1, 3, 4]
        root_type = [2, 5, 6]

        dummy_answers = []

        while len(dummy_answers) < 3:
            synonyms = None
            root = None
            while not (synonyms or root):
                word = random.choice(words)
                synonyms = word.synonyms
                root = word.root_id

            if synonyms and root:
                question_type = random.randint(1, 6)
            elif synonyms:
                question_type = random.choice(synonyms_type)
            elif root:
                question_type = random.choice(root_type)

            synonyms_word = synonyms.values_list('word', flat=True)
            synonyms_th = synonyms.values_list('tran_th', flat=True)
            root_word = list(words.filter(root_id=root).exclude(word=word).values_list('word', flat=True)) 
            root_th = list(words.filter(root_id=root).exclude(word=word).values_list('tran_th', flat=True)) 

            if question_type <= 2:
                # Question: Word, Answer: tran_th, Dummy Answers: synonyms tran_th
                if question_type == 1:
                    question = word.word
                    answer = word.tran_th
                    # dummy_answers = random.sample(list(synonyms_th), min(3, len(synonyms_th)))
                    dummy_answers = list(synonyms_th)
                    if len(synonyms_th) >= 3:
                        dummy_answers = random.sample(dummy_answers, 3)

                # Question: Word, Answer: tran_th, Dummy Answers: tran_th in same root 
                elif question_type == 2:
                    question = word.word
                    answer = word.tran_th
                    # dummy_answers = random.sample(list(root_th), min(3, len(root_th)))
                    dummy_answers = list(root_th)
                    if len(root_th) >= 3:
                        dummy_answers = random.sample(dummy_answers, 3)
                
                # Randomly select tran_th with the same first two letters
                if len(dummy_answers) < 3:                
                        random_words = words.filter(word__startswith=word.tran_th[:2]).exclude(word=answer).exclude(word__in=dummy_answers)
                        # dummy_answers += random.sample(list(random_words.values_list('tran_th', flat=True)), 3 - len(dummy_answers))   
                        if len(random_words) >= 3 - len(dummy_answers):
                            dummy_answers += random.sample(list(random_words.values_list('tran_th', flat=True)), 3 - len(dummy_answers))
                        else:
                            dummy_answers += list(random_words.values_list('tran_th', flat=True))        
            else:
                # Question: tran_th, Answer: Word, Dummy Answers: synonyms word
                if question_type == 3:            
                    question = word.tran_th
                    answer = word.word
                    # dummy_answers = random.sample(list(synonyms_word), min(3, len(synonyms_word)))
                    dummy_answers = list(synonyms_word)
                    if len(synonyms_word) >= 3:
                        dummy_answers = random.sample(dummy_answers, 3)
                
                # Question: tran_eng, Answer: Word, Dummy Answers: synonyms word            
                elif question_type == 4:            
                    question = word.tran_eng
                    answer = word.word
                    # dummy_answers = random.sample(list(synonyms_word), min(3, len(synonyms_word))) 
                    dummy_answers = list(synonyms_word)
                    if len(synonyms_word) >= 3:
                        dummy_answers = random.sample(dummy_answers, 3)
                
                # Question: tran_th, Answer: Word, Dummy Answers: word in same root        
                elif question_type == 5:         
                    question = word.tran_th
                    answer = word.word
                    # dummy_answers = random.sample(list(root_word), min(3, len(root_word)))   
                    dummy_answers = list(root_word)
                    if len(root_word) >= 3:
                        dummy_answers = random.sample(dummy_answers, 3)
                    
                # Question: tran_eng, Answer: Word, Dummy Answers: word in same root
                else:            
                    question = word.tran_eng
                    answer = word.word
                    # dummy_answers = random.sample(list(root_word), min(3, len(root_word)))   
                    dummy_answers = list(root_word)
                    if len(root_word) >= 3:
                        dummy_answers = random.sample(dummy_answers, 3)
                
                # Randomly select words with the same first two letters
                if len(dummy_answers) < 3:                
                        random_words = words.filter(word__startswith=word.word[:2]).exclude(word=answer).exclude(word__in=dummy_answers)
                        if len(random_words) >= 3 - len(dummy_answers):
                            dummy_answers += random.sample(list(random_words.values_list('word', flat=True)), 3 - len(dummy_answers))
                        else:
                            dummy_answers += list(random_words.values_list('word', flat=True))  
        
        choices = [answer] + dummy_answers
        random.shuffle(choices)

        if question and choices:
            return Response({"question": question, "answer": answer, "choices": choices}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)