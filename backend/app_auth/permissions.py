from rest_framework.permissions import BasePermission, SAFE_METHODS


class AdminOrSelfOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or request.user.is_admin

    def has_object_permission(self, request, view, obj):
        return request.method in SAFE_METHODS or request.user.is_admin or request.user == obj


class NotAuthed(BasePermission):
    def has_permission(self, request, view):
        return not request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
