<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { EventData } from "~/types/dto";
import Card from "primevue/card";
import MapPopup from "./MapPopup.vue";
import { createApp } from "vue";

const config = useRuntimeConfig();
mapboxgl.accessToken = config.public.mapboxToken;

const mapContainer = ref<HTMLElement | null>(null);
const mapInstance = ref<mapboxgl.Map | null>(null);

const events = ref<EventData[]>([
  {
    id: 1,
    title: "Event 1",
    description: "Event 1 description",
    date: "2025-05-10 12:00 PM",
    coordinates: [-85.6205, 44.7633],
  },
  {
    id: 2,
    title: "Event 2",
    description: "Event 2 description",
    coordinates: [-85.6203, 44.7629],
    date: "2025-05-10 12:00 PM",
  },
  {
    id: 3,
    title: "Event 3",
    description: "Event 3 description",
    coordinates: [-85.6208, 44.7628],
    date: "2025-05-10 12:00 PM",
  },
]);

const center: [number, number] = [-85.6206, 44.7631];
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
      //TODO: eventually have markers be different based on event type
      const marker = new mapboxgl.Marker({ color: "#FF9800" })
        .setLngLat(event.coordinates)
        .addTo(mapInstance.value as mapboxgl.Map);

      //             const popup = new mapboxgl.Popup({offset: 25}).setHTML(
      //         `<h3 style="margin: 0 0 0.5em;">${event.title}</h3>
      // <h1>Congrats on opening this up</h1>
      //           <p style="margin: 0 0 0.5em;">${event.description}</p>
      //           <em>${event.date}</em>`,
      // );

      const popupContainer = document.createElement("div");
      const popupApp = createApp(MapPopup, { title: event.title, description: event.description });

      popupApp.mount(popupContainer);
      const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(
        popupContainer,
      );
      marker.setPopup(popup);

      // marker.getElement().addEventListener("click", () => {
      //           console.log();
      //   popup.addTo(mapInstance.value as mapboxgl.Map);
      //   popup.setLngLat(event.coordinates);
      // });
    });
  });
});
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
