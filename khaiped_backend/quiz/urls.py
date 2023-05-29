from django.urls import path
from . import views


urlpatterns = [
    path('getQuiz/', views.QuizAPIView.as_view(), name='quiz'),
]
