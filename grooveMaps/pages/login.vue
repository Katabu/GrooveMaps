<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "#app";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Card from "primevue/card";
import { useRuntimeConfig } from "#app";

const email = ref("");
const password = ref("");
const session = useSessionStore();

const router = useRouter();
const config = useRuntimeConfig();

async function handleLogin() {
    await session.login(email.value, password.value);
    router.push("/");
}
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-500 p-4">
        <Card class="w-full max-w-sm p-4">
            <template #title>
                <h1 class="text-2xl font-bold mb-4">Login to localbuzz.live</h1>
            </template>
            <template #content>
                <form @submit.prevent="handleLogin">
                    <div class="p-field mb-3">
                        <label for="email" class="p-d-block">Email</label>
                        <InputText id="email" v-model="email" class="w-full" />
                    </div>
                    <div class="p-field mb-3">
                        <label for="password" class="p-d-block">Password</label>
                        <Password id="password" v-model="password" :feedback="false" class="w-full" />
                    </div>
                    <Button label="Login" type="submit" class="w-full" />
                </form>
                <p class="mt-3 text-center">
                    Don't have an account?
                    <NuxtLink to="/signup" class="text-blue-500">Sign Up</NuxtLink>
                </p>
            </template>
        </Card>
    </div>
</template>

<style scoped>
</style>
