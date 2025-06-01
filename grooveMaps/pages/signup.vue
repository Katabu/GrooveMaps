<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "#app";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Card from "primevue/card";
import Message from "primevue/message";
import { useRuntimeConfig } from "#app";

const session = useSessionStore();
const email = ref("");
const password = ref("");
const password2 = ref("");
const error = ref("");

async function handleSignup() {
    //TODO: make an error notification
    if (password.value !== password2.value) {
        error.value = "Passwords do not match.";
        return;
    }
    await session.register(email.value, password.value);
}
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-500 p-4">
        <Card class="w-full max-w-sm p-4">
            <template #header>
                <h1 class="text-2xl font-bold mb-4">Sign Up for localbuzz.live</h1>
            </template>
            <template #content>
                <form @submit.prevent="handleSignup">
                    <div class="p-field mb-3">
                        <label for="email" class="p-d-block">Email</label>
                        <InputText id="email" v-model="email" type="email" class="w-full" />
                    </div>
                    <div class="p-field mb-3">
                        <label for="password" class="p-d-block">Password</label>
                        <Password id="password" v-model="password" toggleMask class="w-full" />
                    </div>
                    <div class="p-field mb-3">
                        <label for="password2" class="p-d-block">Confirm Password</label>
                        <Password id="password2" v-model="password2" toggleMask class="w-full" />
                    </div>
                    <Button label="Sign Up" type="submit" class="w-full" />
                </form>
                <p class="mt-3 text-center">
                    Already have an account?
                    <NuxtLink to="/login" class="text-blue-500">Login</NuxtLink>
                </p>
                <Message v-if="error" severity="error" :value="[{ summary: 'Error', detail: error }]" />
            </template>
        </Card>
    </div>
</template>

<style scoped>
/* Add additional styling as needed */
</style>
