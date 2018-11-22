from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *



@api_view(['GET'])
def get_orders(request):
    #orders = OrderDetail.objects.all()
    orders = Order.objects.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_order(request):
    print(request.data['headquarter'])
    headquarter_id=request.data['headquarter']
    headquarter = Headquarter.objects.get(pk=headquarter_id)
    order = Order.objects.create(headquarter=headquarter)
    products = request.data.pop('products')
    for product in products:
        productObj=Product.objects.get(pk=product.pop('product_id'))
        OrderDetail.objects.create(product=productObj,order=order,product_quantity=product.pop('product_quantity'))
    serializer=OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
   	 	

#product detail view

class OrderDetailView(APIView):
    """
    get:
        Return a single order detail.

    put:
        Update order details.

    delete:
        Delete an existing order.
    """
    def get_object(self, pk):
        try:
            return Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        order = self.get_object(pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        order = self.get_object(pk)
        serializer = OrderSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        order = self.get_object(pk)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




class HqList(APIView):
    """
    get:
        Return all hqs.
    """
    def get(self, request, format=None):
        #orders = OrderDetail.objects.all()
        hqs = Headquarter.objects.all()
        serializer = HeadquarterSerializer(hqs,many=True)
        return Response(serializer.data)

