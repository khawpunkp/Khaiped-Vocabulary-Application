from django.urls import path
from . import views

urlpatterns = [
    path('random', views.RandomWordView.as_view(), name='random'),
    path('<int:pk>', views.WordDetailView.as_view(), name='word-detail'),
    path('search/', views.SearchWordView.as_view(), name='word-search'),
]