<script setup lang="ts">
import { onMounted, ref } from "vue";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";

const config = useRuntimeConfig();
mapboxgl.accessToken = config.public.mapboxToken;

// Emit the selected geocoder result upward
const emit = defineEmits<{ (e: "result", feature: any): void }>();

// Set the access token for mapbox
mapboxgl.accessToken = mapboxgl.accessToken;

const geocoderContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  // Create the geocoder instance
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
  });

  // Add the geocoder widget to this component's container
  if (geocoderContainer.value) {
    geocoder.addTo(geocoderContainer.value);
  }

  geocoder.on("result", (event: any) => {
    emit("result", event.result.lastSelected);
  });
});
</script>

<template>
  <div ref="geocoderContainer" class="w-full"></div>
</template>

<style scoped>
</style>
