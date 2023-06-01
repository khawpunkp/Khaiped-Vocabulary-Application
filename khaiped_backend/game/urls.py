from django.urls import path
from . import views

urlpatterns = [
    path('game', views.GameAPIView.as_view(), name='game'),
]