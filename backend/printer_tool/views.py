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

    def perform_create(self, serializer):
        to_add = serializer.validated_data.pop('cartridges_add', [])
        to_delete = serializer.validated_data.pop('cartridges_delete', [])
        instance = serializer.save()
        instance.cartridges.add(*to_add)
        instance.cartridges.remove(*to_delete)

    def perform_update(self, serializer):
        to_add = serializer.validated_data.pop('cartridges_add', [])
        to_delete = serializer.validated_data.pop('cartridges_delete', [])
        instance = serializer.save()
        instance.cartridges.add(*to_add)
        instance.cartridges.remove(*to_delete)


class CartridgeViewSet(ModelViewSet):
    queryset = Cartridge.objects.all()
    serializer_class = CartridgeSerializer
    permission_classes = [IsStaffOrReadOnly, ]

    def perform_create(self, serializer):
        to_add = serializer.validated_data.pop('printers_add', [])
        to_delete = serializer.validated_data.pop('printers_delete', [])
        instance = serializer.save()
        instance.printer.add(*to_add)
        instance.printer.remove(*to_delete)

    def perform_update(self, serializer):
        to_add = serializer.validated_data.pop('printers_add', [])
        to_delete = serializer.validated_data.pop('printers_delete', [])
        instance = serializer.save()
        instance.printer.add(*to_add)
        instance.printer.remove(*to_delete)




