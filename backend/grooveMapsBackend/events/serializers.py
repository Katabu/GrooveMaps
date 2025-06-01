from rest_framework_gis.serializers import GeoModelSerializer
from .models import Event

class EventSerializer(GeoModelSerializer):
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'description',
            'location_name',
            'location',     # This is a PointField
            'start_time',
            'end_time',
        ]
