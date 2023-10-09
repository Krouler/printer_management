from django.urls import path, include
from rest_framework.routers import DefaultRouter

from printer_tool.views import AddressViewSet, CabinetViewSet, PrinterViewSet, CartridgeViewSet

router = DefaultRouter()
routerAddress = DefaultRouter()
routerCabinet = DefaultRouter()
routerPrinter = DefaultRouter()
routerCartridge = DefaultRouter()
routerAddress.register('address', AddressViewSet)
routerCabinet.register('cabinet', CabinetViewSet)
routerPrinter.register('printer', PrinterViewSet)
routerCartridge.register('cartridge', CartridgeViewSet)
router.registry.extend(routerAddress.registry)
router.registry.extend(routerCabinet.registry)
router.registry.extend(routerPrinter.registry)
router.registry.extend(routerCartridge.registry)


urlpatterns = [
    path('', include(router.urls)),
]
