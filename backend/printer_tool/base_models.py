from django.db import models


class AbstractAddresses(models.Model):
    address = models.CharField(max_length=200, null=False, blank=False, verbose_name='Адрес')

    def __str__(self):
        return self.address

    class Meta:
        abstract = True
        verbose_name = 'Адрес'
        verbose_name_plural = 'Адреса'


class AbstractCabinet(models.Model):
    address = models.ForeignKey(AbstractAddresses, related_name='cabinets', null=True, blank=True,
                                verbose_name='Адрес здания', on_delete=models.SET_NULL)
    local_name = models.CharField(max_length=100, null=False, blank=False, verbose_name='Наименование')
    number = models.PositiveIntegerField(null=True, blank=True, verbose_name='Номер кабинета')
    floor = models.IntegerField(null=False, blank=False, verbose_name='Этаж')

    def __str__(self):
        return f'{self.floor}: {self.local_name}'

    class Meta:
        abstract = True
        verbose_name = 'Кабинет'
        verbose_name_plural = 'Кабинеты'


class AbstractPrinter(models.Model):
    manufacturer = models.CharField(max_length=50, null=False, blank=False, verbose_name='Производитель')
    model = models.CharField(max_length=100, null=False, blank=False, verbose_name='Модель принтера')

    class Meta:
        abstract = True
        verbose_name = 'Принтер'
        verbose_name_plural = 'Принтеры'
