<script setup lang="ts">
const route = useRoute();

const lng = route.query.lng as string;
const lat = route.query.lat as string;
</script>

<template>
  <div>
    <Map :lng="lng" :lat="lat"/>
  </div>
</template>
