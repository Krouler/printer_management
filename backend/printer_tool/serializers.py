from rest_framework.serializers import ModelSerializer, Serializer

from printer_tool.models import Address, Cabinet, Printer, Cartridge


class AddressSerializer(ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'


class CabinetSerializer(ModelSerializer):

    class Meta:
        model = Cabinet
        fields = '__all__'


class PrinterSerializer(ModelSerializer):

    class Meta:
        model = Printer
        fields = '__all__'


class CartridgeSerializer(ModelSerializer):

    class Meta:
        model = Cartridge
        fields = '__all__'


