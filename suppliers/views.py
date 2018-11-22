from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *


class SupplierList(APIView):
    """
    get:
        Return all suppliers.

    post:
        Create a new supplier.
    """
    def get(self, request, format=None):
        suppliers = Supplier.objects.all()
        serializer = SupplierSerializer(suppliers, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
    	serializer = SupplierSerializer(data=request.data)
    	if serializer.is_valid():
    		serializer.save()
    		return Response(serializer.data, status=status.HTTP_201_CREATED)
   	 	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#supplier detail view

class SupplierDetail(APIView):
    """
    get:
        Return a single supplier.

    put:
        Update supplier details.

    delete:
        Delete an existing supplier.
    """
    def get_object(self, pk):
        try:
            return Supplier.objects.get(pk=pk)
        except Supplier.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        supplier = self.get_object(pk)
        serializer = SupplierSerializer(supplier)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        supplier = self.get_object(pk)
        serializer = SupplierSerializer(supplier, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        supplier = self.get_object(pk)
        supplier.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

