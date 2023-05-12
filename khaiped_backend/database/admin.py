from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Word, WordRoot, WordLearned

class CustomUserAdmin(UserAdmin):
    # model = User
    # list_display = ['username', 'is_admin']
    # filter_horizontal = []
    # list_filter = []
    model = User
    list_display = ['username', 'is_admin', 'game_played', 'quiz_score', 'quiz_taken', 'day_streak']
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Permissions', {'fields': ('is_admin',)}),
        ('User Stats', {'fields': ('game_played', 'quiz_score', 'quiz_taken', 'day_streak')}),
    )
    search_fields = ('username',)
    ordering = ('username',)
    filter_horizontal = ()
    list_filter = ()

class WordAdmin(UserAdmin):
    filter_horizontal = ('synonyms',)
    ordering = ('word', )
    list_display = ('word', 'tran_th', 'tran_eng', 'part_of_speech', 'root_id',)
    list_filter = ('part_of_speech',)
    search_fields = ('word', 'tran_th', 'tran_eng')

admin.site.register(User, CustomUserAdmin)
admin.site.register(Word, WordAdmin)
admin.site.register(WordRoot)
admin.site.register(WordLearned)
