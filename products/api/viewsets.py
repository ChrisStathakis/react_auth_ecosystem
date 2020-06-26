from ..models import Brand
from django.shortcuts import get_object_or_404
from .serializers import BrandSerializer
from rest_framework import viewsets
from rest_framework.response import Response


class BrandViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Brand.objects.all()
        serializer = BrandSerializer(queryset, many=True)
        return Response(serializer.data)


    def retrieve(self, request, pk=None):
        brand = get_object_or_404(Brand, id=pk)
        serializer = BrandSerializer(brand)
        return Response(serializer.data)


brand_list = BrandViewSet.as_view({'get': 'list'})
brand_detail = BrandViewSet.as_view({'get': 'retrieve'})