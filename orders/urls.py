from django.urls import path,re_path
from . import views

urlpatterns = [
    path('', views.get_orders,name='get_orders'),
    path('create/', views.create_order, name='create_order'),
    path('hqs/', views.HqList.as_view(),name='get_hqs'),
    path('<int:pk>/', views.OrderDetailView.as_view(),name='get_delete_update_order'),
]