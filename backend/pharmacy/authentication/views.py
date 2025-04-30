
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

# Create your views here.
# @api_view(["GET"])
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def register(request):
    # Create and validate the data from the request
    serializer = RegisterSerializer(data=request.data)

    # If the data is valid, save the user and return a success response
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'User registered successfully',
            'user': {
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'phone': user.phone,
                'profile_img': request.build_absolute_uri(user.profile_img.url) if user.profile_img else None,
            }
        }, status=status.HTTP_201_CREATED)

    # If the data is invalid, return the errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
