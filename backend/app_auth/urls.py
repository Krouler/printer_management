from django.urls import path

from app_auth.views import RegistrationApiView, UserViewSet

urlpatterns = [
    path('registration/', RegistrationApiView.as_view(), name='user-registration'),
    path('users/', UserViewSet.as_view({'get': 'list'})),
    path('users/<str:username>/', UserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'})),
]
