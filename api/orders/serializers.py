from .models import *
from rest_framework import serializers



class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = ('id','product', 'order','product_quantity')
        read_only_fields=('id',)

class OrderSerializer(serializers.ModelSerializer):
    order_detail = OrderDetailSerializer(many=True,read_only=True)
    class Meta:
        model = Order
        fields = ('id','order_date', 'headquarter','order_detail')
        read_only_fields=('id',)
 