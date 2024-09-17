from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework import mixins, status, views
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from app_auth.permissions import AdminOrSelfOrReadOnly, NotAuthed
from app_auth.serializers import GetUserSerializer, RegistrationSerializer


class UserViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    permission_classes = (AdminOrSelfOrReadOnly,)
    serializer_class = GetUserSerializer
    lookup_url_kwarg = 'username'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        is_stuff = serializer.validated_data.get('is_staff')
        if is_stuff != instance.is_staff and is_stuff is not None and not request.user.is_admin:
            err_obj = {'detail': 'No permission to change staff option'}
            return Response(data=err_obj, status=status.HTTP_403_FORBIDDEN)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class RegistrationApiView(CreateAPIView):
    model = User
    permission_classes = (NotAuthed,)
    serializer_class = RegistrationSerializer


class RetrieveSelfInfo(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    model = User
    permission_classes = (IsAuthenticated,)
    serializer_class = GetUserSerializer

    def get_object(self):
        return self.request.user

