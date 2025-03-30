"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
# from rest_framework.documentation import include_docs_urls
# from django.conf.urls.static import static
from myapp.views import UserProfileViewSet, UserPreferencesViewSet
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
# Create a router and register our viewset with it.
router = routers.DefaultRouter()

router.register(r'users', UserProfileViewSet, basename='user')
router.register(r'user-preferences', UserPreferencesViewSet, basename='user-preferences')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('login/', UserProfileViewSet.login, name='login'),
    path('signup/', UserProfileViewSet.signup, name='signup'),
]

urlpatterns += [
    # path('api/docs/', include_docs_urls(title='My API Documentation')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
