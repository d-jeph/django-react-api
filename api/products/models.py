from django.db import models
from suppliers.models import Supplier

# class Branch(models.Model):
#     name = models.CharField(max_length=250)


# class Headquarter(models.Model):
#     name = models.CharField(max_length=250)
#     branch = models.ForeignKey(Branch, on_delete=models.CASCADE)


# class Order(models.Model):
#     order_date = models.DateTimeField(auto_now_add=True)
#     headquarter = models.ForeignKey(Headquarter, on_delete=models.CASCADE)


class Product(models.Model):
    supplier = models.ForeignKey(Supplier,null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=250)


# class OrderDetail(models.Model):
#     product = models.ForeignKey(Product,null=True, on_delete=models.SET_NULL)
#     order = models.ForeignKey(Order, on_delete=models.CASCADE)
#     product_quanity = models.IntegerField()
