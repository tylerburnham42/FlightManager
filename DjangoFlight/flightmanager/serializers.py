from .models import Airport, Flight
from rest_framework import serializers


class AirportSerializer(serializers.ModelSerializer):
    """
        Class used to package the Airport data in the model to the json for the Rest API
    """
    class Meta:
        model = Airport
        fields = '__all__'

class FlightSerializer(serializers.ModelSerializer):
    """
        Class used to package the Flight data in the model to the json for the Rest API
    """
    destination = AirportSerializer(read_only=True)
    destination_id = serializers.PrimaryKeyRelatedField(
        queryset=Airport.objects.all(), source="destination"
    )
    origin = AirportSerializer(read_only=True)
    origin_id = serializers.PrimaryKeyRelatedField(
        queryset=Airport.objects.all(), source="origin"
    )

    class Meta:
        model = Flight
        fields = ('__all__')
