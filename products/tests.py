import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from .models import Product
from suppliers.models import Supplier
from .serializers import ProductSerializer

# initialize the APIClient app
client = Client()

class GetAllProductsTest(TestCase):

    def setUp(self):
        Product.objects.create(
            name='Samsung TV',supplier=Supplier.objects.get(pk=1))
        Product.objects.create(
            name='Lenovo Laptop',supplier=Supplier.objects.get(pk=2))
        Product.objects.create(
            name='Iphone X', supplier=Supplier.objects.get(pk=1))

    def test_get_all_products(self):
        # get API response
        response = client.get(reverse('get_products'))
        # get data from db
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)



class GetSingleProductTest(TestCase):

    def setUp(self):
        Product.objects.create(
            name='Samsung TV',supplier=Supplier.objects.get(pk=1))
        Product.objects.create(
            name='Lenovo Laptop',supplier=Supplier.objects.get(pk=2))
        Product.objects.create(
            name='Iphone X', supplier=Supplier.objects.get(pk=1))

    def test_get_valid_single_product(self):
        response = client.get(
            reverse('get_delete_update_product', kwargs={'pk': 1}))
        iphone = Product.objects.get(pk=1)
        serializer = ProductSerializer(iphone)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_product(self):
        response = client.get(
            reverse('get_delete_update_product', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)



class CreateNewProductTest(TestCase):
    """ Test module for inserting a new puppy """

    def setUp(self):
        self.valid_payload = {
            'name':'Iphone X', 'supplier':1
        }

    def test_create_valid_product(self):
        response = client.post(
            reverse('get_products'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)