from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class HomeView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        content = {'message': 'Hello World!'}
        return Response(content)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields =['url', 'username', 'email', 'is_staff']


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer



router = routers.DefaultRouter()
router.register(r'users', UserViewSet)