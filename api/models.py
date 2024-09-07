from django.db import models
from django.conf import settings
from django.utils.html import mark_safe

# Create your models here.
class Customer(models.Model):
    address = models.CharField(max_length=255)
    postcode = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.user.first_name} {self.user.last_name}"  

class MealPlan(models.Model):
    MEAT_ONLY = "MO"
    MEAT_AND_VEGAN = "MV"
    VEGAN_ONLY = "VO"
    PROTEIN_PREFERENCE_OPTIONS = [
        (MEAT_ONLY,"Meat Only"),
        (MEAT_AND_VEGAN, "Meat and Vegan"),
        (VEGAN_ONLY, "Vegan Only"),
    ]

    STANDARD_SIZE = "S"
    LARGE_SIZE = "L"
    MEAL_SIZE_OPTIONS = [
        (STANDARD_SIZE, "Standard"),
        (LARGE_SIZE, "Large")
    ]

    protein_preference = models.CharField(
        max_length=2, 
        choices=PROTEIN_PREFERENCE_OPTIONS,
        default=MEAT_ONLY        
    )
    meal_size = models.CharField(
        max_length=1,
        choices=MEAL_SIZE_OPTIONS,
        default=STANDARD_SIZE
    )
    number_of_meals = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    user_id = models.ForeignKey(Customer, on_delete=models.CASCADE, blank=True, related_name="customer")



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
    delivery_date = models.DateField()
    ordered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Order for {self.customer.user.first_name} {self.customer.user.last_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name="items")
    meal = models.ForeignKey(Meal, on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField()
    
# class PaymentDetails(models.Model):
    # 