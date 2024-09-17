from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from printer_tool.models import Address, Cabinet, Printer, Cartridge


class AddressSerializer(ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'


class CabinetSerializer(ModelSerializer):
    address = serializers.CharField(read_only=True)
    address_id = serializers.IntegerField()

    class Meta:
        model = Cabinet
        fields = '__all__'


class PrinterSerializer(ModelSerializer):
    cabinet = serializers.CharField(read_only=True)
    cabinet_id = serializers.IntegerField()
    cartridges_add = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)
    cartridges_delete = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)

    class Meta:
        model = Printer
        fields = '__all__'


class CartridgeSerializer(ModelSerializer):
    printer = PrinterSerializer(many=True, read_only=True)
    printers_add = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)
    printers_delete = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)

    class Meta:
        model = Cartridge
        fields = '__all__'


