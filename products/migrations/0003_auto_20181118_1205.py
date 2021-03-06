# Generated by Django 2.1.3 on 2018-11-18 09:05

from django.db import migrations, models
from django.db import migrations, models
from suppliers.models import Supplier


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_auto_20180829_1520'),
        ('suppliers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='name',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='product',
            name='supplier',
            field=models.ForeignKey(null=True, on_delete=models.deletion.SET_NULL, to='suppliers.Supplier'),
        ),
    ]
