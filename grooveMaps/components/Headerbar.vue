<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'

const menuItems = ref([
  { label: 'Home', icon: 'pi pi-home', url: '/' },
  { label: 'Events', icon: 'pi pi-calendar', url: '/events' },
  { label: 'About', icon: 'pi pi-info-circle', url: '/about' },
  { label: 'Contact', icon: 'pi pi-envelope', url: '/contact' }
])
</script>

<template>
  <header class="app-header">
    <Menubar :model="menuItems" class="menubar">
      <template #start>
        <div class="logo-container">
          <NuxtLink to="/" class="logo-link">
            <!-- <img src="/logo.svg" alt="App Logo" class="app-logo" /> -->
          <span class="app-title">local.buzz</span>
          </NuxtLink>
        </div>
      </template>
     <!-- TODO: make this look nicer on smaller screens -->
      <template #end>
        <div class="user-actions">
          <Button label="Sign In" icon="pi pi-user" class="signin-btn" />
          <Button label="Sign Up" icon="pi pi-plus" class="signup-btn" />
        </div>
      </template>
    </Menubar>
  </header>
</template>


<style scoped>

.app-header {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

</style>

