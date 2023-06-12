from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from database.models import Word, WordLearned
import random
from rest_framework_simplejwt.authentication import JWTAuthentication

class QuizScoreAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        quiz_score = request.data.get('score')
        user = request.user
        if user:
            user.quiz_score += quiz_score
            user.quiz_taken += 10
            if not user.is_quized and user.quiz_score >= 5:  # Check if the user qualifies for the quiz bonus
                user.score += 300
                user.is_quized = True
            user.score += (quiz_score * 50) + 100  # Calculate the score
            user.save()
            return Response(status=status.HTTP_200_OK)


class QuizAPIView(APIView):
    def get(self, request):
        mode = request.GET.get('m')
        allWords = request.GET.get('a')
        allWords = allWords.lower() == 'true'

        words = Word.objects.all()

        if not allWords and request.user.is_authenticated:
            learned_id = WordLearned.objects.filter(user_id=request.user).values_list('word_id', flat=True)
            questions = words.filter(id__in=learned_id)
            if not questions:
                questions = words
        else:
            questions = words

        if not words:
            return Response({"message": "No words available."}, status=status.HTTP_204_NO_CONTENT)

        if not questions:
            return Response({"message": "No questions available."}, status=status.HTTP_204_NO_CONTENT)

        if mode == "easy":
            return self.generate_easy_quiz(words, questions)
        elif mode == "hard":
            return self.generate_hard_quiz(words, questions)
        else:
            return Response({"message": "Invalid quiz mode."}, status=400)

    def generate_easy_quiz(self, words, questions):

        prev_question_word = getattr(self, 'prev_question_word', None)
        if prev_question_word:
            questions = questions.exclude(id=prev_question_word.id)

        question_word = random.choice(questions)
        self.prev_question_word = question_word

        question_type = random.randint(1, 3)

        # Question: Word, Answer: tran_th, Dummy Answers: random tran_th
        if question_type == 1:
            question = question_word.word
            answer = question_word.tran_th
            dummy_answers = random.sample(list(words.exclude(tran_th=answer).values_list('tran_th', flat=True)), 3)

        # Question: tran_th, Answer: Word, Dummy Answers: random word
        elif question_type == 2:
            question = question_word.tran_th
            answer = question_word.word
            dummy_answers = random.sample(list(words.exclude(word=answer).values_list('word', flat=True)), 3)

        # Question: tran_eng, Answer: Word, Dummy Answers: random word
        else:
            question = question_word.tran_eng
            answer = question_word.word
            dummy_answers = random.sample(list(words.exclude(word=answer).values_list('word', flat=True)), 3)
        choices = [answer] + dummy_answers
        random.shuffle(choices)

        if question and choices:
            return Response({"question": question, "answer": answer, "choices": choices}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

    def generate_hard_quiz(self, words, questions):
        dummy_answers = []

        prev_question_word = getattr(self, 'prev_question_word', None)

        while len(dummy_answers) < 3:
            synonyms = None
            root = None
            while not (synonyms or root):
                if prev_question_word:
                    questions = questions.exclude(id=prev_question_word.id)
                question_word = random.choice(questions)
                self.prev_question_word = question_word
                synonyms = question_word.synonyms
                root = question_word.root_id

            if synonyms and root:
                question_type = random.randint(1, 3)
            elif synonyms:
                question_type = 1
            elif root:
                question_type = random.randint(2, 3)

            synonyms_word = synonyms.values_list('word', flat=True)
            synonyms_th = synonyms.values_list('tran_th', flat=True)
            root_word = list(words.filter(root_id=root).exclude(word=question_word).values_list('word', flat=True))
            root_th = list(words.filter(root_id=root).exclude(word=question_word).values_list('tran_th', flat=True))

            if question_type == 1:
                # Question: Word, Answer: tran_th, Dummy Answers: synonyms tran_th + tran_th in same root
                if question_type == 1:
                    question = question_word.word
                    answer = question_word.tran_th
                    dummy_answers = list(set(list(synonyms_th) + list(root_th)))
                    if len(dummy_answers) >= 3:
                        dummy_answers = random.sample(dummy_answers, 3)

                # Randomly select tran_th with the same first two letters
                if len(dummy_answers) < 3:
                        random_words = words.filter(
                            Q(word__startswith=question_word.tran_th[:1]) |
                            Q(word__startswith=question_word.tran_th[:2]) |
                            Q(word__startswith=question_word.tran_th[:3])
                        ).exclude(word=answer).exclude(word__in=dummy_answers).distinct()
                        if len(random_words) >= 3 - len(dummy_answers):
                            dummy_answers += random.sample(list(random_words.values_list('tran_th', flat=True)), 3 - len(dummy_answers))
                        else:
                            dummy_answers += list(random_words.values_list('tran_th', flat=True))
                        if len(dummy_answers) < 3:
                            random_words = words.exclude(word=answer).exclude(word__in=dummy_answers)
                            if len(random_words) >= 3 - len(dummy_answers):
                                dummy_answers += random.sample(list(random_words.values_list('tran_th', flat=True)), 3 - len(dummy_answers))
                            else:
                                dummy_answers += list(random_words.values_list('tran_th', flat=True))

            else:
                # Question: tran_th, Answer: Word, Dummy Answers: synonyms word + word in same root
                if question_type == 2:
                    question = question_word.tran_th
                    answer = question_word.word
                    dummy_answers = list(set(list(synonyms_word) + list(root_word)))
                    if len(dummy_answers) >= 3:
                        dummy_answers = random.sample(dummy_answers, 3)

                # Question: tran_eng, Answer: Word, Dummy Answers: synonyms word + word in same root
                elif question_type == 3:
                    question = question_word.tran_eng
                    answer = question_word.word
                    dummy_answers = list(set(list(synonyms_word) + list(root_word)))
                    if len(dummy_answers) >= 3:
                        dummy_answers = random.sample(dummy_answers, 3)

                # Randomly select words with the same first two letters
                if len(dummy_answers) < 3:
                        random_words = words.filter(word__startswith=question_word.word[:2]).exclude(word=answer).exclude(word__in=dummy_answers)
                        if len(random_words) >= 3 - len(dummy_answers):
                            dummy_answers += random.sample(list(random_words.values_list('word', flat=True)), 3 - len(dummy_answers))
                        else:
                            dummy_answers += list(random_words.values_list('word', flat=True))
                        if len(dummy_answers) < 3:
                            random_words = words.exclude(word=answer).exclude(word__in=dummy_answers)
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