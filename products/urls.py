from django.urls import path,re_path
from . import views

urlpatterns = [
    path('', views.get_products,name='get_products'),
    path('create/', views.create_product,name='create_product'),
    path('<int:pk>/', views.ProductDetail.as_view(),name='get_delete_update_product'),
    #path('uppliers', views.SupplierList.as_view(),name='get_suppliers'),
    #re_path(r'^/(?P<pk>[0-9]+)/$', views.ProductDetail.as_view(),name='get_delete_update_product'),
]