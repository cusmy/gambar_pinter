from .views import AngkaViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'angka', AngkaViewSet)
urlpatterns = router.urls