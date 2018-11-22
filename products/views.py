from django.http import HttpResponse,Http404
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
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
    product = Product.objects.create(supplier=supplier)
    serializer=OrderSerializer(product)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

#product detail view

class ProductDetail(APIView):
    """
    get:
        Return a single product.

    put:
        Update product details.

    delete:
        Delete an existing product.
    """
    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404("Invalid product id.")

    def get(self, request, pk, format=None):
        product = self.get_object(pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        product = self.get_object(pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        product = self.get_object(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

