from django.urls import path

from app_auth.views import RegistrationApiView, UserViewSet, RetrieveSelfInfo

urlpatterns = [
    path('registration/', RegistrationApiView.as_view(), name='user-registration'),
    path('list/', UserViewSet.as_view({'get': 'list'})),
    path('list/<str:username>/', UserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'})),
    path('me/', RetrieveSelfInfo.as_view({'get': 'retrieve'})),
    path('me/update/', RetrieveSelfInfo.as_view({'patch': 'partial_update'})),
]
