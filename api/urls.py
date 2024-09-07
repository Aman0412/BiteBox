from django.urls import path
from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()
router.register("meals", views.MealViewSet)
router.register("customers", views.CustomerViewSet)
router.register("orders", views.OrderViewSet, basename="Order")
router.register("orderitems", views.OrderItemViewSet, basename="OrderItem")

urlpatterns = router.urls