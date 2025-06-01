<script setup lang="ts">
const store = useAppStore();
const events = computed(() => store.events);
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl font-bold pt-4">Events</h1>
    <div class="flex flex-col items-center">
      <div class="flex flex-row">
        <!-- TODO: add in event creation link and conditional if they can do that -->
        <div class="p-2">
          <Button label="Create Event" icon="pi pi-plus" />
        </div>
      </div>
    </div>
  </div>
  <div v-for="(event, i) in events" class="pt-4 flex justify-center">
    <EventItem :event="event" />
  </div>
</template>
