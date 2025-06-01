from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Event
from .serializers import EventSerializer
from rest_framework.decorators import action

# TODO: make this or something



# class EventViewSet(viewsets.ModelViewSet):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer
#     permission_classes = [IsAuthenticated]
#
#     @action(detail=False, methods=["get"], url_path="my-events")
#     def get_queryset(self):
#         # Only return events for the logged-in user, if that's your requirement
#         return Event.objects.filter(user=self.request.user)
#
#     @action(detail=False, methods=["post"], url_path="create-event")
#     def perform_create(self, serializer):
#         # Automatically associate Event with the current user
#         serializer.save(user=self.request.user)
