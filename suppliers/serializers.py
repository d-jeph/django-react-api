from .models import *
from rest_framework import serializers


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ('id','name')
        read_only_fields=('id',)
 