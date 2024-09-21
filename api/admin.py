from django.contrib import admin
from django.http import HttpRequest
from .models import Meal, Order, OrderItem, Customer, CustomerAddress, MealPlan, Configuration
# Register your models here.

@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ("name", "calories", "is_vegan", "is_gluten_free", "protein", "carbohydrates", "fat", "image_tag")
    list_editable = ("calories", "carbohydrates", "protein", "fat")

class CustomerAddressInline(admin.TabularInline):
    model = CustomerAddress

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ["user__username","user__first_name", "user__last_name"]
    inlines = [
        CustomerAddressInline
    ]

class OrderItemInline(admin.TabularInline):
    model = OrderItem

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["customer", "delivery_date", "ordered_at", "customer_address", "payment_status"]
    inlines = [OrderItemInline]
    def items_title(self, orderitem):
        return orderitem.meal.name
@admin.register(MealPlan)
class MealPlanAdmin(admin.ModelAdmin):
    list_display = ["protein_preference", "meal_size", "number_of_meals", "price"]
    list_editable = ["price"]

@admin.register(Configuration)
class ConfigurationAdmin(admin.ModelAdmin):
    list_display = ["delivery_price"]
    def has_add_permission(self, request: HttpRequest) -> bool:
        return False

