from __future__ import unicode_literals
from django.db import migrations


def create_initial_suppliers(apps, schema_editor):
    Supplier = apps.get_model('suppliers', 'Supplier')

    Supplier(name='Supplier 1 Ltd').save()
    Supplier(name='Supplier 2 Ltd').save()
    


class Migration(migrations.Migration):

    dependencies = [
        ('suppliers', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_suppliers),
    ]