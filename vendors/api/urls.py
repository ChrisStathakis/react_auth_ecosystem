from django.urls import path

from .views import (InvoiceListApiView, InvoiceUpdateDestroyApiView, invoice_homepage,
                    PaymentMethodListApiView, PaymentMethodUpdateDestroyApiView,
                    VendorApiListView, VendorUpdateDestroyApiView
                    )

app_name = 'vendors'


urlpatterns = [
    path('home', invoice_homepage, name='home'),
    path('invoices/', InvoiceListApiView.as_view(), name='invoices'),
    path('invoices/<int:pk>/', InvoiceUpdateDestroyApiView.as_view(), name='invoice_update'),
    path('payment-methods/', PaymentMethodListApiView.as_view(), name='payment_method_list'),
    path('payment-method/<int:pk>/', PaymentMethodUpdateDestroyApiView.as_view(), name='payment_method_update'),
    path('vendors/', VendorApiListView.as_view(), name='vendor_list'),
    path('vendors/<int:pk>/', VendorUpdateDestroyApiView.as_view(), name='vendor_update')

]