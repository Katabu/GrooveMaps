<script setup lang="ts">
const session = useSessionStore();

onBeforeMount(async () => {
    await session.refresh();
});
</script>
<template>
    <div>
        <Headerbar />
        <div>
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </div>
        <Footer />
    </div>
</template>
