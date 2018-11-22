from __future__ import unicode_literals
from django.db import migrations


def create_initial_products(apps, schema_editor):
    Product = apps.get_model('products', 'Product')

    Product(name='Samsung TV', supplier=1).save()
    Product(name='Lenovo Laptop', supplier=2).save()
    Product(name='Sony PS4 PlayStation', supplier=1).save()
    Product(name='Iphone X', supplier=2).save()
    Product(name='Samsung S9', supplier=2).save()
    Product(name='Cantucci', supplier=2).save()
    Product(name='Xperia XZ2', supplier=2).save()
    Product(name='Rolex Air King', supplier=1).save()

# def create_initial_supplier(apps,schema_editor):
#     Supplier = apps.get_model('products', 'Supplier')

#     Supplier(name='Supplier 1 Ltd').save()
#     Supplier(name='Supplier 2 Ltd').save()


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_products),
        #migrations.RunPython(create_initial_supplier),
    ]