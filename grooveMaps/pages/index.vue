<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRuntimeConfig } from "#imports";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import Card from "primevue/card";
import { Button } from "primevue";
import type { MapboxFeature } from "~/types/dto";

const config = useRuntimeConfig();
mapboxgl.accessToken = config.public.mapboxToken;

const router = useRouter();
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
});

onMounted(() => {
  geocoder.addTo("#geocoder-container");
});

const geocoderData = ref<MapboxFeature | null>(null);

function setGeocoderData(data: string): void {
  try {
    geocoderData.value = JSON.parse(data) as MapboxFeature;
  } catch (error) {
    console.error("Failed to parse geocoder data", error);
    geocoderData.value = null;
  }
}

function searchLocation(useCurrentLocation: boolean): void {
  if (useCurrentLocation) {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          router.push(`/map?lng=${longitude}&lat=${latitude}`);
        },
        (error) => {
          console.error("Error retrieving current location", error);
        }
      );
    }
    return;
  }
  setGeocoderData(geocoder.lastSelected);
  const location = geocoderData.value;
  if (!location) return;
  router.push(`/map?lng=${location.center[0]}&lat=${location.center[1]}`);
}
</script>

<template>
  <div class="flex justify-center py-16">
    <Card class="w-full md:w-2/3">
      <template #content>
        <div id="geocoder-container" class="flex justify-center"></div>
        <div class="flex justify-center py-3 gap-x-2">
          <Button @click="searchLocation(true)" class="flex justify-center">
            Current location
          </Button>
          <Button @click="searchLocation(false)" class="flex justify-center">
            Search
          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>

</style>
