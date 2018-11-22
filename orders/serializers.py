from .models import *
from products.serializers import ProductSerializer
from rest_framework import serializers




class OrderDetailSerializer(serializers.ModelSerializer):
	product=ProductSerializer(read_only=True)
	class Meta:
		model = OrderDetail
		fields = ('id','product', 'order','product_quantity')
		read_only_fields=('id',)

class HeadquarterSerializer(serializers.ModelSerializer):
	"""docstring for Headquarter"""
	class Meta:
		model = Headquarter
		fields = ('id','name')
		read_only_fields=('id',)
		

class OrderSerializer(serializers.ModelSerializer):
    order_detail = OrderDetailSerializer(many=True,read_only=True)
    headquarter = HeadquarterSerializer(read_only=True)
	#headquarter_id = (read_only=True)
    class Meta:
        model = Order
        fields = ('id','order_date','order_date_human', 'headquarter','order_detail')
        read_only_fields=('id','order_date_human','order_detail')





 