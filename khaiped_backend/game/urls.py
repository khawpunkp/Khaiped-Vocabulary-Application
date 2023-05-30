from django.urls import path
from . import views

urlpatterns = [
    path('getWord', views.GetGameView.as_view(), name='game'),
]