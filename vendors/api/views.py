from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.viewsets import ModelViewSet

from django_filters.rest_framework import DjangoFilterBackend

from .serializers import *
from ..models import PaymentMethod, Vendor


@api_view(['GET', ])
def invoice_homepage(request, format=None):
    return Response({
        'invoices': reverse('vendors:invoices', request=request, format=format),
        'vendors': reverse('vendors:vendor_list', request=request, format=format),
        'payment_method': reverse('vendors:payment_method_list', request=request, format=format)
    })


class InvoiceListApiView(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated, ]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['vendor',]
    search_fields = ['title']


class InvoiceUpdateDestroyApiView(generics.RetrieveDestroyAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated, ]


class PaymentMethodListApiView(generics.ListCreateAPIView):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    permission_classes = [IsAuthenticated, ]
    search_fields = ['title', ]
    filter_backends = [filters.SearchFilter, ]


class PaymentMethodUpdateDestroyApiView(generics.RetrieveDestroyAPIView):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    permission_classes = [IsAuthenticated, ]


class VendorApiListView(generics.ListCreateAPIView):
    serializer_class = VendorSerializer
    permission_classes = [IsAuthenticated, ]
    queryset = Vendor.objects.all()
    search_filter = ['title']
    filter_backends = [filters.SearchFilter ,]


class VendorUpdateDestroyApiView(generics.RetrieveDestroyAPIView):
    serializer_class = VendorSerializer
    permission_classes = [IsAuthenticated, ]
    queryset = Vendor.objects.all()


class PaymentViewSet(ModelViewSet):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
    permission_classes = [IsAuthenticated, ]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_filter = ['title', ]
    filterset_fields = ['vendor', ]
