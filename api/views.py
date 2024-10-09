from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework import mixins
from .models import Meal, Customer, Order, OrderItem, CustomerAddress, Configuration
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import MealSerializer, CustomerSerializer, OrderSerializer, OrderItemSerializer, CustomerAddressSerializer,UpdateCustomerSerializer, CreateOrderItemSerializer, ConfigurationSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import status
from django.conf import settings

import stripe


stripe.api_key = settings.SECRET_KEY
# Create your views here.
class MealViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

class CustomerViewSet(mixins.CreateModelMixin, 
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      viewsets.GenericViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer 

    @action(detail=False, methods=["get", "patch"])
    def me(self, request):
        (customer, created) = Customer.objects.get_or_create(user_id=request.user.id)
        if request.method == "GET":
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)
        elif request.method == "PATCH":
            serializer = CustomerSerializer(customer, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
    
    @action(detail=False, methods=["post", "get"], serializer_class=CustomerAddressSerializer)
    def add_address(self, request):
        customer = get_object_or_404(Customer, user=request.user)
        if request.method == "POST":
            serializer = CustomerAddressSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(customer=customer)
                return Response(serializer.data, status=201)
            return Response(status=404)
        elif request.method == "GET":
            queryset = CustomerAddress.objects.filter(customer=customer)
            serializer = CustomerAddressSerializer(queryset, many=True)
            return Response(serializer.data)


                
class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset=Order.objects.all()

    

class OrderItemViewSet(mixins.CreateModelMixin,
                       viewsets.GenericViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class ConfigurationView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ConfigurationSerializer
    queryset = Configuration.objects.all()

class CreatePaymentIntentView(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def create_payment_intent(self, request):
        try:
            amount = request.data.get('amount')
            
            if not amount:
                return Response({'error': 'Amount is required'}, status=status.HTTP_400_BAD_REQUEST)

            intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),  # Convert to cents
                currency='usd',
            )

            return Response({
                'clientSecret': intent.client_secret
            })

        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'An unexpected error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
