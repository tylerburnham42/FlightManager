from distutils.command.build_scripts import first_line_re
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from .models import Airport, Flight
from .serializers import AirportSerializer, FlightSerializer
from .initdb import populate_data

# Create your views here.
class AirportViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer
    

class FlightViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'origin_id', 'destination_id']


@api_view(['POST'])
def PopulateData(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'POST':
        populate_data()
        return Response(status=status.HTTP_200_OK)