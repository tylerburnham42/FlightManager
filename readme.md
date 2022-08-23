# Airline Search App

This application uses Django for a backend and React as a front end to allow a user to request and search flight data imported originally from a csv file.


## Quick Start
The following sections describe the pieces needed to install the application correctly. 

### **Django Backend Installation**

Install [Anaconda](https://www.anaconda.com/).



In a new terminal navigate to the top level directory of the repository.
Next create the environment from the environment.yml file by running the following command:

```bash
cd DjangoFlight
conda env create -f environment.yml
```
Next activate the conda environment to verify the environment was created correctly.
```bash
conda activate flight-app
```
Next create the model migrations to setup the application correctly.
```bash
python manage.py makemigrations
python manage.py migrate
```

### **React Frontend Installation**



Install [Node/Yarn](https://nodejs.org/en/download/).

Install the node packaged by running the following commands:
```bash
cd frontend
yarn install
```

### Starting the Application

In a new terminal navigate to the top level directory of the repository. Next run the following commands to launch the Python backend.
```bash
cd DjangoFlight
conda activate flight-app
python manage.py runserver
```
In a second terminal navigate to the top level directory of the repository. Next run the following commands to launch the Python backend.
```bash
cd frontend
yarn start
```
### Populate Initial Data
A simple post command was setup to tell the backend to pull data from the csv. In a more real situation this post could be replaced by another service pushing data to the database. 

Open a browser and access the local Django backend. [http://localhost:8000/populate-data/](http://localhost:8000/populate-data/).

Click the POST command button.


## Design Notes
The application was written with a React front-end and a django back-end. Material UI was chosen to simplify the creation of components. 

The front end is written with Typescript. The App.tsx loads the main window component that is the main element holding the states of the airport list and the currently loaded flights for the table. This main windows loads the search boxes and the main flight results table.

Below is an image of the main window.

![Main Window](/images/image1.PNG?raw=true)

The airportSearchBox.tsx is the component used for the autocomplete functionality. The Airport name and abbreviation are concatenated like "(ATL) Hartsfield - Jackson Atlanta I" so that both the name and the abbreviation can be searched with autocomplete.

![Autocomplete](/images/image2.PNG?raw=true)

The backend is written in Python using the Django web framework. The models.py file defines the Django ORM model definitions for the two endpoints needed in this application Flight and Airport.

```python
from django.db import models

class Airport(models.Model):
    name = models.CharField(max_length=50)
    abbv = models.CharField(max_length=50, unique=True)

class Flight(models.Model):
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    flight_identifier = models.CharField(max_length=50)
    flt_num = models.IntegerField()
    ...
    destination =  models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="destination")
    origin =  models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="origin")
```

These models are serialized using the serializers.py. This turns the data into the json that is passed over the REST api.

```python
from .models import Airport, Flight
from rest_framework import serializers


class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = '__all__'

class FlightSerializer(serializers.ModelSerializer):
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
```

Last the views.py file sets up the actual endpoints for where the REST API can request or post.

```python 
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

```


Three restful endpoints were setup with the following addresses.

```
localhost:8000/airports/
localhost:8000/flights/
localhost:8000/populate-data/
```

The flights data can be filtered using the IDs of the Airports for Origin and Destination. 

![Autocomplete](/images/image3.PNG?raw=true)

The airports are a foreign key link to the flight data. Each flight has 2 linked airports for origin and destination. That flight data when queried looks like the data looks like the image below. 

![Autocomplete](/images/image4.PNG?raw=true)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License

Copyright (2022) - Tyler Burnham - All Rights Reserved