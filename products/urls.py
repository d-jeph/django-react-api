from django.urls import path,re_path
from . import views

urlpatterns = [
    path('', views.get_products,name='get_products'),
    path('create/', views.create_product,name='create_product'),
    path('update/<int:pk>/', views.update_product,name='update_product'),
    # path('<int:pk>/', views.ProductDetail.as_view(),name='get_delete_update_product'),
    path('<int:pk>/',views.ProductDetailDeleteView.as_view(),name='get_delete_update_product'),
    #path('uppliers', views.SupplierList.as_view(),name='get_suppliers'),
    # path('update/<int:pk>/', views.update_product, name='update_product'),
    # url(r'^questions/(?P<pk>\d+)/$', views.question_details, name='question_details'),
]