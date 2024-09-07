from django.contrib import admin
from .models import Meal, MealPlan, Order, OrderItem, Customer
# Register your models here.

@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ("name", "calories", "is_vegan", "is_gluten_free", "protein", "carbohydrates", "fat", "image_tag")
    list_editable = ("calories", "carbohydrates", "protein", "fat")

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass

class OrderItemInline(admin.TabularInline):
    model = OrderItem

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["customer", "delivery_date", "ordered_at"]
    inlines = [OrderItemInline]
    def items_title(self, orderitem):
        return orderitem.meal.name

