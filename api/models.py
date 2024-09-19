from django.db import models
from django.conf import settings
from django.utils.html import mark_safe

# Create your models here.
class Customer(models.Model):
    phone_number = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.user.first_name} {self.user.last_name}"  

class CustomerAddress(models.Model):
    postcode = models.CharField(max_length=10)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    county = models.CharField(max_length=100)
    
    customer = models.ForeignKey(Customer, models.CASCADE, related_name="address_details")

    def __str__(self) -> str:
        return f"""
                Address:{self.address}
                City: {self.city}
                County: {self.county}
                Postcode: {self.postcode}"""


    
class Meal(models.Model):
    name = models.CharField(max_length=255)
    is_vegan = models.BooleanField()
    is_gluten_free = models.BooleanField()
    is_dairy_free = models.BooleanField()
    ingredients = models.TextField()
    calories = models.IntegerField()
    protein = models.DecimalField(max_digits=4, decimal_places=1)
    carbohydrates = models.DecimalField(max_digits=4, decimal_places=1)
    fat = models.DecimalField(max_digits=4, decimal_places=1)
    image = models.ImageField(upload_to="api/images", unique=True)

    def __str__(self) -> str:
        return self.name

    def image_tag(self):
        return mark_safe('<img src="/media/%s" width="150" height="150" />' % (self.image))
    
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    customer_address = models.ForeignKey(CustomerAddress, on_delete=models.PROTECT)
    delivery_date = models.DateField()
    ordered_at = models.DateTimeField(auto_now_add=True)

    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    payment_status = models.CharField(
        max_length=10,
        choices=PAYMENT_STATUS_CHOICES,
        default="pending"
    )

    def __str__(self) -> str:
        return f"Order ID: #{self.id} for {self.customer.user.first_name} {self.customer.user.last_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name="items")
    meal = models.ForeignKey(Meal, on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField()
     
# class PaymentDetails(models.Model):
    # 