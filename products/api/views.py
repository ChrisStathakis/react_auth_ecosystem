from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.viewsets import ModelViewSet

from .serializers import ProductSerializer, ProductCreateSerializer, BrandSerializer, VendorSerializer
from ..models import Product, Vendor, Brand


@api_view(['GET'])
def homepage(request, format=None):
    return Response({
        'products': reverse('products:list', request=request, format=format),
        'products-create': reverse('products:create', request=request, format=format)

    })


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, ]


class ProductCreateApiView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductCreateSerializer
    permission_classes = [IsAuthenticated, ]


class VendorViewSet(ModelViewSet):
    serializer_class = VendorSerializer
    queryset = Vendor.objects.all()


