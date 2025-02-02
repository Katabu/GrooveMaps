<script setup lang="ts">
const config = useRuntimeConfig();
onMounted(() => {
    console.log(config)
});
</script>

<template>
  <div>
        <!-- TODO: this will eventually change as i don't want the map to be the first thing seen -->
    <Map/>
  </div>
</template>
