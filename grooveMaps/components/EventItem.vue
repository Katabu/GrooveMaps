<script setup lang="ts">
import type { EventData } from "~/types/dto";
import Card from "primevue/card";

const props = defineProps<{
  event: EventData;
}>();
</script>

<template>
  <Card class="lg:w-2/3 lg:h-40">
    <template #content>
      <div class="flex">
        <div class="max-md:hidden lg:w-1/3">some kind of picture</div>
        <div class="flex flex-col gap-y-3">
          <h1 class="font-bold">{{ event.title }}</h1>
          <div>
            <p>{{ event.description }}</p>
          </div>
          <div>
            <p>{{ event.date }}</p>
          </div>
          <div>
            <p>{{ event.address }}</p>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
