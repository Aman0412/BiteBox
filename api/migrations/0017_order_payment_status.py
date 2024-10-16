# Generated by Django 5.1 on 2024-09-19 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0016_order_customer_address"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="payment_status",
            field=models.CharField(
                choices=[
                    ("pending", "Pending"),
                    ("completed", "Completed"),
                    ("failed", "Failed"),
                    ("refunded", "Refunded"),
                ],
                default="pending",
                max_length=10,
            ),
        ),
    ]
