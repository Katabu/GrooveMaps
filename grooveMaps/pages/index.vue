<script setup lang="ts">
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

//TODO: add some error handling if not done correctly
function searchLocation(useCurrentLocation: boolean) {
  if (useCurrentLocation) {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        router.push(`/map?lng=${longitude}&lat=${latitude}`);
      });
    }
    return;
  }
  const location = JSON.parse(geocoder.lastSelected) as MapboxFeature;
  if (location == null) return;
  console.log(location);
  router.push(`/map?lng=${location.center[0]}&lat=${location.center[1]}`);
}
</script>

<template>
  <div class="flex justify-center py-16">
    <Card class="w-2/3">
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
