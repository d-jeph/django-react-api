from .models import *
from rest_framework import serializers


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ('id','name')
        read_only_fields=('id',)

class ProductSerializer(serializers.ModelSerializer):
    supplier = SupplierSerializer(read_only=True)
    class Meta:
        model = Product
        fields = ('id','name', 'supplier')
        read_only_fields=('id',)
 