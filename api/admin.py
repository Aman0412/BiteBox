from django.contrib import admin
from .models import Meal, Order, OrderItem, Customer, CustomerAddress
# Register your models here.

@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ("name", "calories", "is_vegan", "is_gluten_free", "protein", "carbohydrates", "fat", "image_tag")
    list_editable = ("calories", "carbohydrates", "protein", "fat")

class CustomerAddressInline(admin.TabularInline):
    model = CustomerAddress

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ["user__first_name", "user__last_name"]
    inlines = [
        CustomerAddressInline
    ]

class OrderItemInline(admin.TabularInline):
    model = OrderItem

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["customer", "delivery_date", "ordered_at", "customer_address"]
    inlines = [OrderItemInline]
    def items_title(self, orderitem):
        return orderitem.meal.name

