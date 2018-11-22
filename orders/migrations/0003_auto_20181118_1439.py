from __future__ import unicode_literals
from django.db import migrations
from datetime import datetime, timedelta
import random
# 'Africa/Nairobi'


def create_initial_braches(apps, schema_editor):
    Branch = apps.get_model('orders', 'Branch')

    Branch(name='Branch 1').save()
    Branch(name='Branch 2').save()


def create_initial_hqs(apps, schema_editor):
    HeadQuarter = apps.get_model('orders', 'HeadQuarter')
    Branch = apps.get_model('orders', 'Branch')

    HeadQuarter(name='HeadQuarter 1',branch=Branch.objects.get(pk=1)).save()
    HeadQuarter(name='HeadQuarter 2',branch=Branch.objects.get(pk=2)).save()


def create_initial_orders(apps, schema_editor):
    Order = apps.get_model('orders', 'Order')
    HeadQuarter = apps.get_model('orders', 'HeadQuarter')

    Order(order_date=(datetime.today() - timedelta(days=random.randint(5,25))),headquarter=HeadQuarter.objects.get(pk=1)).save()
    Order(order_date=(datetime.today() - timedelta(days=random.randint(5,25))),headquarter=HeadQuarter.objects.get(pk=2)).save()


def create_initial_order_dt(apps, schema_editor):
    OrderDetail = apps.get_model('orders', 'OrderDetail')
    Order = apps.get_model('orders', 'Order')
    Product = apps.get_model('products', 'Product')

    OrderDetail(product=Product.objects.get(pk=1),order=Order.objects.get(pk=1),product_quantity=10).save()
    OrderDetail(product=Product.objects.get(pk=2),order=Order.objects.get(pk=2),product_quantity=5).save()
    OrderDetail(product=Product.objects.get(pk=2),order=Order.objects.get(pk=2),product_quantity=9).save()
    


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_braches),
        migrations.RunPython(create_initial_hqs),
        migrations.RunPython(create_initial_orders),
        migrations.RunPython(create_initial_order_dt),
        
    ]
