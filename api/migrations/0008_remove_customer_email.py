# Generated by Django 5.1 on 2024-09-02 18:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_alter_mealplan_user_id"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="customer",
            name="email",
        ),
    ]
