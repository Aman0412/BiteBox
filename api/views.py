from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework import mixins
from .models import Meal, Customer, Order, OrderItem
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import MealSerializer, CustomerSerializer, OrderSerializer, OrderItemSerializer, UpdateCustomerSerializer, CreateOrderItemSerializer
# Create your views here.
class MealViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

class CustomerViewSet(mixins.CreateModelMixin, 
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      viewsets.GenericViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer 

    @action(detail=False)
    def me(self, request):
        customer = get_object_or_404(Customer, id=request.user.id)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset=Order.objects.all()

    

class OrderItemViewSet(mixins.CreateModelMixin,
                       viewsets.GenericViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
