from rest_framework import serializers

from ..models import Vendor, Employer, VendorBankingAccount, Invoice, Payment, PaymentMethod


class VendorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vendor
        fields = ['active', 'title', 'owner', 'afm', 'doy', 'phone', 'cellphone', 'email',
                  'site', 'description', 'address', 'city', 'balance', 'paid_value',
                  'value', 'taxes_modifier', 'id'
                  ]


class EmployerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employer
        fields = ['active', 'title', 'vendor', 'phone', 'cellphone', 'email']


class VendorBankingAccounr(serializers.ModelSerializer):

    class Meta:
        model = VendorBankingAccount
        fields = ['payment_method', 'vendor', 'name', 'iban', 'code', 'id', 'tag_vendor']


class InvoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Invoice
        fields = ['date', 'title', 'payment_method', 'tag_payment_method', 'vendor', 'tag_vendor',
                  'extra_value', 'value', 'final_value', 'description'
                  ]


class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = ['date', 'title', 'payment_method',
                  'vendor', 'tag_vendor', 'value', 'description']


class PaymentMethodSerializer(serializers.ModelSerializer):

    class Meta:
        model = PaymentMethod
        fields = ['id', 'title', 'category']
