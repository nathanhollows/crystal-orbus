<script setup lang="ts">
import NavLogo from './logos/NavLogo.vue'
</script>
<template>
  <nav class="bg-orbus-500 p-4 text-white">
    <div class="container mx-auto align-middle flex justify-between md:max-w-xl">
      <NavLogo class="h-8 self-center" />
      <div class="flex gap-3">
        <RouterLink
          to="/"
          class="text-white p-2 hover:bg-orbus-900 transition-all rounded font-bold"
          >My Stops</RouterLink
        >
        <RouterLink
          to="/map"
          class="text-white p-2 hover:bg-orbus-900 transition-all rounded font-bold"
          >Map</RouterLink
        >
      </div>
    </div>
  </nav>
</template>
