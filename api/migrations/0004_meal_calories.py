# Generated by Django 5.1 on 2024-08-30 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_meal_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="meal",
            name="calories",
            field=models.IntegerField(default=500),
            preserve_default=False,
        ),
    ]
