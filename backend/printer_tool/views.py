from rest_framework import mixins
from rest_framework.viewsets import ModelViewSet

from printer_tool.models import Address, Cabinet, Printer, Cartridge
from printer_tool.permissions import IsStaffOrReadOnly
from printer_tool.serializers import AddressSerializer, CabinetSerializer, PrinterSerializer, CartridgeSerializer


class AddressViewSet(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsStaffOrReadOnly, ]


class CabinetViewSet(ModelViewSet):
    queryset = Cabinet.objects.all()
    serializer_class = CabinetSerializer
    permission_classes = [IsStaffOrReadOnly, ]


class PrinterViewSet(ModelViewSet):
    queryset = Printer.objects.all()
    serializer_class = PrinterSerializer
    permission_classes = [IsStaffOrReadOnly, ]


class CartridgeViewSet(ModelViewSet):
    queryset = Cartridge.objects.all()
    serializer_class = CartridgeSerializer
    permission_classes = [IsStaffOrReadOnly, ]




