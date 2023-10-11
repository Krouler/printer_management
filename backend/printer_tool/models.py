from django.db import models
from . import base_models


class Address(base_models.AbstractAddresses):
    pass


class Cabinet(base_models.AbstractCabinet):
    address = models.ForeignKey(Address, related_name='cabinets', null=True, on_delete=models.SET_NULL)


class Printer(base_models.AbstractPrinter):
    cabinet = models.ForeignKey(Cabinet, related_name='printers', null=True, on_delete=models.SET_NULL)
    toner_level = models.FloatField(default=0.0, null=False, blank=False, verbose_name='Уровень тонера')
    ip_address = models.CharField(max_length=15, default='127.0.0.1', null=False, blank=False, verbose_name='Сетевой адрес принтера')


class Cartridge(base_models.AbstractCartridge):
    printer = models.ManyToManyField(Printer, related_name='cartridges')


