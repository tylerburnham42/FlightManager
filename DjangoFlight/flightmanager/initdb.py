import os
import pandas
from DjangoFlight.settings import BASE_DIR
from .models import Airport, Flight

def populate_data():
    """
    Gets the flight and airport data from the data.csv file.
    """
    filepath = os.path.join(BASE_DIR, 'flightmanager', 'data', 'data.csv')
    flight_data = pandas.read_csv(filepath)

    Flight.objects.all().delete()
    Airport.objects.all().delete()

    airports = []
    airport_set = set()
    for _, row in flight_data.iterrows():
        if row['origin'] not in airport_set:
            airport_set.add(row['origin'])
            airports.append(Airport(
                name=row['origin_full_name'],
                abbv=row['origin']
            ))

        if row['destination'] not in airport_set:
            airport_set.add(row['destination'])
            airports.append(Airport(
                name=row['destination_full_name'],
                abbv=row['destination']
            ))

    
    Airport.objects.bulk_create(airports)

    flights = []
    for _, row in flight_data.iterrows():
        flights.append(Flight(
            created_at = row['created_at'],
            updated_at = row['updated_at'],
            flight_identifier = row['flight_identifier'],
            flt_num = row['flt_num'],
            scheduled_origin_gate = row['scheduled_origin_gate'],
            scheduled_destination_gate = row['scheduled_destination_gate'],
            out_gmt = row['out_gmt'],
            in_gmt = row['in_gmt'],
            off_gmt = row['off_gmt'],
            on_gmt = row['on_gmt'],
            destination =  Airport.objects.filter(abbv = row['destination']).first(),
            origin =  Airport.objects.filter(abbv = row['origin']).first()
        ))

    Flight.objects.bulk_create(flights)


if __name__ == "__main__":
    populate_data()
