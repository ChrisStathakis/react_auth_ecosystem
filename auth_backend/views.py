from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET', ])
def homepage_api_view(request, format=None):
    return Response({
        'products': reverse('products:home', request=request, format=format),
        'create-token': reverse('token_obtain_pair', request=request, format=format),
        'token-refresh': reverse('token_refresh', request=request, format=format),
        'invoice_home': reverse('vendors:home', request=request, format=format)
    })
