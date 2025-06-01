from django.db import models
from django.contrib.auth.models import User
from django.contrib.gis.db import models as gis_models

class Event(models.Model):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='events'
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    # optionally any other fields you might want, e.g. event_image, capacity, etc.


