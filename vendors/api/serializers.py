from rest_framework import serializers

from ..models import Vendor, Employer


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

