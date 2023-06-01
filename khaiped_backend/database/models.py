from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone
from datetime import timedelta

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, username, password=None):
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password):
        user = self.create_user(
            username=username,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class WordRoot(models.Model):
    root = models.CharField(max_length=64, unique=True, null=False)
    pic = models.ImageField(
        upload_to='word_root_images/', null=True, blank=True)

    def __str__(self):
        return self.root


class Word(models.Model):
    PARTS_OF_SPEECH = [
        ('noun', 'Noun'),
        ('pronoun', 'Pronoun'),
        ('verb', 'Verb'),
        ('adjective', 'Adjective'),
        ('adverb', 'Adverb'),
        ('preposition', 'Preposition'),
        ('conjunction', 'Conjunction'),
        ('interjection', 'Interjection'),
    ]
    word = models.CharField(max_length=64, unique=True, null=False)
    tran_th = models.TextField(null=False)
    tran_eng = models.TextField(null=False)
    part_of_speech = models.CharField(choices=PARTS_OF_SPEECH, max_length=20, default='noun')
    root_id = models.ForeignKey(WordRoot, on_delete=models.SET_NULL, null=True)
    synonyms = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.word


class User(AbstractBaseUser):
    username = models.CharField(max_length=32, unique=True, null=False)
    password = models.CharField(max_length=128, null=False)
    is_admin = models.BooleanField(default=False)
    game_played = models.IntegerField(default=0, null=False)
    quiz_score = models.IntegerField(default=0, null=False)
    quiz_taken = models.IntegerField(default=0, null=False)
    day_streak = models.IntegerField(default=0, null=False)
    last_login = models.DateTimeField(null=True, blank=True)
    is_login = models.BooleanField(default=False)
    daily_play = models.IntegerField(default=0, null=False)
    is_played = models.BooleanField(default=False)
    is_quized = models.BooleanField(default=False)    
    score = models.IntegerField(default=0, null=False)

    USERNAME_FIELD = 'username'

    objects = UserManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True    

    @property
    def is_staff(self):
        return self.is_admin
    
    def update_login(self):
        self.reset_quest_status()
        self.day_streak = self.get_day_streak()
        self.last_login = timezone.now()
        self.save()

    def get_day_streak(self):
        current_date = timezone.now().date()
        previous_date = current_date - timedelta(days=1)
        if self.last_login.date() == current_date:
            return self.day_streak
        elif self.last_login.date() == previous_date:
            return self.day_streak + 1
        else:
            return 1        
    
    def reset_quest_status(self):
        current_date = timezone.now().date()
        if self.last_login.date() != current_date:
            self.is_login = False
            self.daily_play = 0
            self.is_played = False
            self.is_quiz = False    
    
    @property
    def quiz_percent(self):
        if self.quiz_taken == 0:
            return 0
        else:
            return round(self.quiz_score / self.quiz_taken * 100)

class WordLearned(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    word_id = models.ForeignKey(Word, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user_id} learned {self.word_id}"

# python manage.py makemigrations
# python manage.py migrate
