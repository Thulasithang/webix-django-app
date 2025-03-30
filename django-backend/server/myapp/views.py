from django.shortcuts import render
from rest_framework import viewsets
from .models import UserProfile, UserPreferences
from .serializers import UserProfileSerializer, UserPreferencesSerializer
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User

# Create your views here.


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    # @api_view(["POST"])
    @action(detail=False, methods=["post"])
    def login(self, request):
        """
        Handles user login.
        """
        username = request.data.get("username")
        password = request.data.get("password")
        
        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "status": 200}, status=200)
        else:
            return Response({"error": "Invalid credentials"}, status=401)
        

    # @api_view(["POST"])
    @action(detail=False, methods=["post"])
    def signup(self, request):
        """
        Handles user signup.
        """
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        print("username: ", request.data.get("username"))
        
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=400)
        
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=400)
        
        user = User(username = username, email = email)
        user.set_password(password)  
        user.save()     
        UserProfile.objects.create(user=user)
        return Response({"message": "User created successfully", "status": 201}, status=201)

class UserPreferencesViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user preferences instances.
    """
    queryset = UserPreferences.objects.all()
    serializer_class = UserPreferencesSerializer

