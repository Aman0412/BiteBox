from django.urls import path
from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()
router.register("meals", views.MealViewSet)
router.register("customers", views.CustomerViewSet)
router.register("orders", views.OrderViewSet, basename="Order")
router.register("orderitems", views.OrderItemViewSet, basename="OrderItem")
router.register("configuration", views.ConfigurationView)
router.register("payments", views.CreatePaymentIntentView, basename="payment")

urlpatterns = router.urls
