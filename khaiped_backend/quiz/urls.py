from django.urls import path
from . import views

urlpatterns = [
    path('get-quiz/', views.QuizAPIView.as_view(), name='get-quiz'),
    path('score', views.QuizScoreAPIView.as_view(), name='add-score'),
]
