from django.urls import path,re_path
from . import views

urlpatterns = [
    path('', views.OrderList.as_view(),name='get_orders'),
    path('<int:pk>/', views.OrderDetail.as_view(),name='get_delete_update_order'),
]