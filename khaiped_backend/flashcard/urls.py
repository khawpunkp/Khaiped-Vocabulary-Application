from django.urls import path
from . import views

urlpatterns = [
    path('getWords/', views.FlashcardAPIView.as_view(), name='flashcard'),
]