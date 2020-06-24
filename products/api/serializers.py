from rest_framework import serializers

from ..models import Product


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['id', 'active', 'title', 'sku', 'tag_vendor',
                  'tag_brand', 'qty', 'final_value'
        ]