from django.db import models
from suppliers.models import Supplier
from products.models import Product

class Branch(models.Model):
    name = models.CharField(max_length=250)
    def __unicode__(self):
        return "{}:{}".format(self.id,self.name)
        # return "{} {:%B %d, %Y}".format("Andre", datetime.now()))


class Headquarter(models.Model):
    name = models.CharField(max_length=250)
    branch = models.ForeignKey(Branch,related_name='headquarters', on_delete=models.CASCADE)

    def __unicode__(self):
         '%d: %s' % (self.id, self.name)

class Order(models.Model):
    order_date = models.DateTimeField(auto_now_add=True)
    headquarter = models.ForeignKey(Headquarter, on_delete=models.CASCADE)

    @property
    def order_date_human(self):
        return '%s' % self.order_date.strftime('%d-%b-%Y')

    def __unicode__(self):
         
         '%d: %s' % (self.id, self.order_date.strftime('%B %d, %Y'))


class OrderDetail(models.Model):
    product = models.ForeignKey(Product,null=True,related_name='orders', on_delete=models.SET_NULL)
    order = models.ForeignKey(Order,related_name='order_detail', on_delete=models.CASCADE)
    # user = models.OneToOneField(User)
    product_quantity = models.IntegerField()

    def __unicode__(self):
        return '%d: %d' % (self.id, self.product_quantity)
