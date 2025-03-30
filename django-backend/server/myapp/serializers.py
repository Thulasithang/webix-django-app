
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserPreferences, UserProfile


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """

    user = UserSerializer(read_only=True)
    class Meta:
        model = UserProfile
        fields = '__all__'


class UserPreferencesSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserPreferences model.
    """
    class Meta:
        model = UserPreferences
        fields = ['user', 'theme', 'language', 'email_notifications', 'push_notifications', 'notification_frequency', 'font_style', 'font_size']