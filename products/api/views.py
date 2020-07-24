from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import ProductSerializer, ProductCreateSerializer, BrandSerializer, VendorSerializer, ProductClassSerializer
from ..models import Product, Vendor, Brand, ProductClass


@api_view(['GET'])
def homepage(request, format=None):
    return Response({
        'products': reverse('products:list', request=request, format=format),
        'products-create': reverse('products:create', request=request, format=format),
        
    })


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, ]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['vendor', 'brand']
    search_fields = ['title']


class ProductUpdateApiView(generics.RetrieveUpdateDestroyAPIView):
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
    permission_classes = [IsAuthenticated, ]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['active', ]
    search_fields = ['title']


class BrandViewSet(ModelViewSet):
    serializer_class = BrandSerializer
    queryset = Brand.objects.all()
    permission_classes = [IsAuthenticated, ]

    def destroy(self, request, *args, **kwargs):
        brand = self.get_object()
        try:
            brand.delete()
            return Response(data='Brand Deleted')
        except:
            print('here!')
            return Response(status=202, data='Object is Protected')


class ProductClassViewSet(ModelViewSet):
    queryset = ProductClass.objects.all()
    serializer_class = ProductClassSerializer
