<script setup lang="ts">
import { ref } from "vue";
import Menubar from "primevue/menubar";
import Button from "primevue/button";

const session = useSessionStore();

const isLoggedIn = computed(() => session.isLoggedIn);

const menuItems = ref([
    { label: "Home", icon: "pi pi-home", url: "/" },
    { label: "Events", icon: "pi pi-calendar", url: "/events" },
    { label: "About", icon: "pi pi-info-circle", url: "/about" },
    { label: "Contact", icon: "pi pi-envelope", url: "/contact" },
]);

const showMobileMenu = ref(false);
function toggleMobileMenu() {
    showMobileMenu.value = !showMobileMenu.value;
}
</script>

<template>
    <header class="app-header">
        <Menubar :model="menuItems" class="menubar">
            <template #start>
                <div class="logo-container">
                    <NuxtLink to="/" class="logo-link flex items-center">
                        <span class="app-title text-xl font-bold">local.buzz</span>
                    </NuxtLink>
                </div>
            </template>
            <template #end>
                <div class="user-actions flex items-center" v-if="!isLoggedIn">
                    <!-- Buttons visible on small screens and up -->
                    <div class="hidden sm:flex space-x-2">
                        <NuxtLink to="/login">
                            <Button label="Sign In" icon="pi pi-user" class="signin-btn" />
                        </NuxtLink>
                        <NuxtLink to="/signup">
                            <Button label="Sign Up" icon="pi pi-plus" class="signup-btn" />
                        </NuxtLink>
                    </div>
                    <!-- Hamburger menu visible only on extra small screens -->
                    <div class="sm:hidden">
                        <Button icon="pi pi-bars" class="hamburger-btn" @click="toggleMobileMenu" />
                    </div>
                </div>
                <div v-else class="user-actions flex items-center">
                    <NuxtLink to="/profile" class="profile-link">
                        <Button icon="pi pi-user" class="profile-btn" />
                    </NuxtLink>
                    <Button label="Logout" icon="pi pi-sign-out" class="logout-btn" @click="session.logout" />
                </div>
            </template>
        </Menubar>
        <!-- Mobile menu overlay -->
        <transition name="fade">
            <div v-if="showMobileMenu && !isLoggedIn" @click.self="toggleMobileMenu"
                class="mobile-menu fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div class="bg-white p-4 rounded shadow relative">
                    <Button icon="pi pi-times" class="absolute p-2" @click="toggleMobileMenu" />
                    <div class="flex flex-col space-y-2 mt-4">
                        <NuxtLink to="/login">
                            <Button label="Sign In" icon="pi pi-user" @click="toggleMobileMenu" />
                        </NuxtLink>
                        <NuxtLink to="/signup">
                            <Button label="Sign Up" icon="pi pi-plus" @click="toggleMobileMenu" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div v-else-if="showMobileMenu && isLoggedIn" class="mobile-menu-overlay fixed inset-0" @click.self="toggleMobileMenu">

                <div class="bg-white p-4 rounded shadow relative">
                    <Button icon="pi pi-times" class="absolute p-2" @click="toggleMobileMenu" />
                    <div class="flex flex-col space-y-2 mt-4">
                        <NuxtLink to="/logout">
                            <Button label="Logout" icon="pi pi-plus" @click="toggleMobileMenu" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </transition>
    </header>
</template>

<style scoped>
.app-header {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

/* PrimeVue Menubar default styles are overridden here */
.menubar {
    border: none;
    border-radius: 0;
}

.app-title {
    font-size: 1.4rem;
    font-weight: 600;
}

/* User Actions (Sign In / Sign Up) */
.user-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

/* Optional: Fade transition for the mobile menu overlay */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
