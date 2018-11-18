from django.urls import path,re_path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

# urlpatterns = [
#     path('', views.SupplierList.as_view(),name='get_suppliers'),
#     path('<int:pk>/', views.SupplierDetail.as_view(),name='get_delete_update_supplier'),
# ]

urlpatterns = [
    path('', views.SupplierList.as_view(),name='get_suppliers'),
    path('<int:pk>/', views.SupplierDetail.as_view(),name='get_delete_update_supplier'),
]

