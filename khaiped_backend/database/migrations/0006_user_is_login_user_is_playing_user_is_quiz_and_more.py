# Generated by Django 4.2.1 on 2023-06-01 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0005_alter_user_last_login'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_login',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='is_playing',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='is_quiz',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='score',
            field=models.IntegerField(default=0),
        ),
    ]