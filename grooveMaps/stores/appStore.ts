import { defineStore } from "pinia";
import type { EventData } from "~/types/dto";

export const useAppStore = defineStore("store", () => {
    const config = useRuntimeConfig();
    const mapboxToken = config.public.mapboxAccessToken;
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
  return {
    mapboxToken,
    events,
  };
});
