# Generated by Django 4.2.1 on 2023-06-01 12:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0010_user_quiz_percent'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='quiz_percent',
        ),
    ]