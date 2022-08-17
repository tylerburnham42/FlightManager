from django.db import models

print("TEST")

class Airport(models.Model):
    name = models.CharField(max_length=50)
    abbv = models.CharField(max_length=50, unique=True)

class Flight(models.Model):
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    flight_identifier = models.CharField(max_length=50)
    flt_num = models.IntegerField()
    scheduled_origin_gate = models.CharField(max_length=10)
    scheduled_destination_gate = models.CharField(max_length=10)
    out_gmt = models.DateTimeField()
    in_gmt = models.DateTimeField()
    off_gmt = models.DateTimeField()
    on_gmt = models.DateTimeField()
    destination =  models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="destination")
    origin =  models.ForeignKey(Airport, on_delete=models.CASCADE, related_name="origin")