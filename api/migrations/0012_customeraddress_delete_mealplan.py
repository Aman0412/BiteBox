# Generated by Django 5.1 on 2024-09-17 13:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0011_alter_mealplan_user_id"),
    ]

    operations = [
        migrations.CreateModel(
            name="CustomerAddress",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("postcode", models.CharField(max_length=10)),
                ("address", models.CharField(max_length=255)),
                ("city", models.CharField(max_length=100)),
                ("county", models.CharField(max_length=100)),
                (
                    "customer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="address_details",
                        to="api.customer",
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="MealPlan",
        ),
    ]
