from django.urls import path
from . import views

urlpatterns = [
    path('', views.GameAPIView.as_view(), name='game'),
    path('score', views.GameScoreAPIView.as_view(), name='add-score'),
]