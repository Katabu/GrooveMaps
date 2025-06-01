<script setup lang="ts">
import { Button } from 'primevue';


const props = defineProps({
    title: String,
    description: String,
});
</script>

<template>
<div class="text-black">
        <h3>{{props.title}}</h3>
        <p>{{props.description}}</p>

        <!-- TODO: style button. make it only for users -->
        <Button>I'm going!</Button>
    </div>
</template>

<style scoped>
    
</style>
