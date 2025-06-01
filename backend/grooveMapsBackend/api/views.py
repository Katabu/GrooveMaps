from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
# Create your views here.


class TestApiView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        json_string = '{"name": "John", "age": 30, "city": "New York"}'
        return Response(
            {"message": "Hello, this is a test response!"}, status=status.HTTP_200_OK
        )
