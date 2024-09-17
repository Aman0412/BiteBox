from rest_framework import serializers
from .models import Meal, Customer, MealPlan, Order, OrderItem, CustomerAddress

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = [
            "id",
            "name", 
            "is_vegan", 
            "is_gluten_free", 
            "is_dairy_free",
            "ingredients",
            "calories",
            "protein", 
            "carbohydrates",
            "fat",
            "image"
        ]
        
class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = [
            "postcode",
            "address",
            "city",
            "county"
        ]

 
class CustomerSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    address_details = CustomerAddressSerializer(many=True, required=False)
    class Meta:
        model = Customer
        fields = [
            "id",
            "user_id",
            "phone_number",
            "address_details"
        ]

class UpdateCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "phone_number",
            "address",
            "postcode"
        ]
class CreateOrderItemSerializer(serializers.ModelSerializer):
    meal_id = serializers.IntegerField()
    class Meta:
        model = OrderItem
        fields = [
            "id",
            "meal_id",
            "quantity",
        ] 

class OrderItemSerializer(serializers.ModelSerializer):
    meal_id = serializers.PrimaryKeyRelatedField(queryset=Meal.objects.all(), source="meal")
    order_id = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(), source="order")
    class Meta:
        model = OrderItem
        fields = [
            "id",
            "order_id",
            "meal_id",
            "quantity",
        ]

class DisplayOrderItemSerializer(serializers.ModelSerializer):
    meal = MealSerializer()
    class Meta:
        model = OrderItem
        fields = [
            "meal",
            "quantity"
        ]

class OrderSerializer(serializers.ModelSerializer):
    items = DisplayOrderItemSerializer(many=True, required=False)
    class Meta:
        model = Order
        fields = [
            "id",
            "customer",
            "delivery_date",
            "items"
        ]

       