from django.contrib import admin
from django.contrib import admin
from .models import User, Word, WordRoot, WordLearned

class CustomUserAdmin(admin.ModelAdmin):
    # model = User
    # list_display = ['username', 'is_admin']
    # filter_horizontal = []
    # list_filter = []
    model = User
    list_display = ['username', 'is_admin', 'game_played', 'quiz_percent', 'day_streak', 'last_login']
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Permissions', {'fields': ('is_admin',)}),
        ('User Stats', {'fields': ('game_played', 'quiz_score', 'quiz_taken', 'day_streak', 'last_login', 'is_login','daily_play', 'is_played', 'is_quized', 'score')}),
    )

    def quiz_percent(self, obj):
        return obj.quiz_percent
    quiz_percent.short_description = 'Quiz Percent'
    search_fields = ('username',)
    ordering = ('username',)
    filter_horizontal = ()
    list_filter = ()

class WordAdmin(admin.ModelAdmin):
    filter_horizontal = ('synonyms',)
    ordering = ('word', )
    list_display = ('word', 'tran_th', 'tran_eng', 'part_of_speech', 'root_id',)
    list_filter = ('part_of_speech',)
    search_fields = ('word', 'tran_th', 'tran_eng')

admin.site.register(User, CustomUserAdmin)
admin.site.register(Word, WordAdmin)
admin.site.register(WordRoot)
admin.site.register(WordLearned)
