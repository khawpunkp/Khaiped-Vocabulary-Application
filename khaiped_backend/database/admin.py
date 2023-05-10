from django.contrib import admin

# Register your models here.
from .models import Word, WordRoot, User, WordLearned

admin.site.register(Word)
admin.site.register(WordRoot)
admin.site.register(User)
admin.site.register(WordLearned)