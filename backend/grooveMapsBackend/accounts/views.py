from rest_framework import exceptions, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import throttling
from .serializers import RegisterSerializer


class RegisterApiView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [throttling.UserRateThrottle]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "username": user.username,
                    "email": user.email,
                    "id": user.id,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginApiView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [throttling.UserRateThrottle]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if not email or not password:
            return Response(
                {"error": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = authenticate(username=email, password=password)
        if not user:
            return Response(
                {"details": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )
        refresh = RefreshToken.for_user(user)
        response = Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "username": user.username,
                "email": user.email,
                "id": user.id,
            },
            status=status.HTTP_200_OK,
        )
        response.set_cookie("refresh_token", str(refresh))
        return response


class RefreshTokenApiView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [throttling.UserRateThrottle]

    def post(self, request):
        refresh_token = request.data.get("refresh") or request.COOKIES.get(
            "refresh_token"
        )

        if not refresh_token:
            return Response(
                {"detail": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            new_refresh = RefreshToken(refresh_token)
            new_access = str(new_refresh.access_token)
            response = Response(
                {"access": str(new_access), "refresh": str(new_refresh)},
                status=status.HTTP_200_OK,
            )

            return response
        except TokenError as exc:
            raise exceptions.AuthenticationFailed(str(exc))


class LogoutApiView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [throttling.UserRateThrottle]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response(
                {"detail": "`refresh` token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except TokenError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_205_RESET_CONTENT)
