from .models import *
from rest_framework import serializers


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ('id','name')
        read_only_fields=('id',)

class ProductSerializer(serializers.ModelSerializer):
    supplier = SupplierSerializer()
    class Meta:
        model = Product
        fields = ('id','name', 'supplier')
        read_only_fields=('id',)

    def update(self, instance, validated_data):
        supplier_id=validated_data.data.pop('supplier')
        supplier = Supplier.objects.get(pk=supplier_id)
        instance.name = validated_data.get('name', instance.name)
        instance.supplier = supplier
        instance.save()
        return instance


class ProductUpdateSerializer(serializers.ModelSerializer):
    supplier = SupplierSerializer()
    class Meta:
        model = Product
        fields = ('id','name', 'supplier')
        read_only_fields=('id',)
 