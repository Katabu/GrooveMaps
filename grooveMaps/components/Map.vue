<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { EventData } from "~/types/dto";
import Card from "primevue/card";
import MapPopup from "./MapPopup.vue";
import { createApp } from "vue";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const config = useRuntimeConfig();
const store = useAppStore();
mapboxgl.accessToken = config.public.mapboxToken;
const props = defineProps<{
  lng: string;
  lat: string;
}>();

const mapContainer = ref<HTMLElement | null>(null);
const mapInstance = ref<mapboxgl.Map | null>(null);
const events = computed(() => store.events);

// TODO: make the center of the map dynamic
const center: [number, number] = [+props.lng, +props.lat];
onMounted(() => {
  if (!mapContainer.value) return;

  mapInstance.value = new mapboxgl.Map({
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/streets-v11",
    center: center, //[lng, lat]
    zoom: 15,
  });

  mapInstance.value.on("load", () => {
    events.value.forEach((event) => {
      addEventToMap(event);
    });
    mapInstance.value?.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      }),
    );
  });
});

watch(events, (newEvents) => {
  newEvents.forEach((event) => {
    addEventToMap(event);
  });
});

function addEventToMap(event: EventData) {
  //TODO: eventually have markers be different based on event type
  const marker = new mapboxgl.Marker({ color: "#FF9800" })
    .setLngLat(event.coordinates)
    .addTo(mapInstance.value as mapboxgl.Map);

  const popupContainer = document.createElement("div");
  const popupApp = createApp(MapPopup, {
    title: event.title,
    description: event.description,
  });

  popupApp.mount(popupContainer);
  const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(
    popupContainer,
  );
  marker.setPopup(popup);
}
</script>

<template>
  <div class="flex justify-center py-16 h-2/3">
    <Card class="w-3/4">
      <template #content>
        <div ref="mapContainer" class="map-container p-4"></div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  /* TODO: make height relative? */
  height: 400px;
  position: relative;
}
</style>
