from .models import *
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','name', 'supplier')
        read_only_fields=('id',)
 