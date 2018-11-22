from django.http import HttpResponse,Http404
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *


@api_view(['GET'])
def get_products(request):
    #orders = OrderDetail.objects.all()
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_product(request):
    supplier_id=request.data.pop('supplier')
    supplier = Supplier.objects.get(pk=supplier_id)
    product = Product.objects.create(supplier=supplier,name=request.data.pop('name'))
    serializer=ProductSerializer(product)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def update_product(request,pk):
    supplier_id=request.data.pop('supplier')
    supplier = Supplier.objects.get(pk=supplier_id)
    product = Product.objects.get(pk=pk)
    product.name =request.data.pop('name')
    product.supplier=supplier
    #product=Product.objects.filter(pk=pk).update(name=request.data.pop('name'),supplier=supplier)
    product.save()
    serializer=ProductUpdateSerializer(product)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

class ProductDetailDeleteView(generics.RetrieveDestroyAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


