# Generated by Django 4.2.6 on 2023-10-09 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('printer_tool', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='printer',
            name='toner_level',
            field=models.FloatField(default=0.0, verbose_name='Уровень тонера'),
        ),
    ]