from rest_framework import serializers

from ..models import Product, Brand, Vendor


class BrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        fields = ['id', 'active', 'name']


class VendorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vendor
        fields = ['id', 'active', 'title', 'tag_balance']


class ProductCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['active', 'sku', 'vendor', 'value', 'value_discount',
                  'brand', 'qty', 'barcode', 'categories', 'id'
                  ]


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['active', 'sku', 'vendor', 'value', 'value_discount',
                  'brand', 'qty', 'barcode', 'categories', 'tag_vendor',
                  'tag_brand', 'id'
                  ]

