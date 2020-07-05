from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ProductListView, ProductUpdateApiView,ProductCreateApiView, homepage, VendorViewSet, BrandViewSet, ProductClassViewSet


app_name = 'products'

router = DefaultRouter()
router.register('brands', BrandViewSet, basename='brand')
router.register('vendors', VendorViewSet, basename='vendor')
router.register('product-class', ProductClassViewSet, basename='product_class')

urlpatterns = [
    path('home/', homepage, name='home'),
    path('list/', ProductListView.as_view(), name='list'),
    path('create/', ProductCreateApiView.as_view(), name='create'),
    path('update/<int:pk>/', ProductUpdateApiView.as_view(), name='update_destroy')

   
] + router.urls
