from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics


from .serializers import ProductSerializer
from ..models import Product


class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, ]
