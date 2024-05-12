<script setup lang="ts">
import NavLogo from '@/components/logos/NavLogo.vue'
import { BookmarkIcon, MapIcon } from 'lucide-vue-next'
</script>
<template>
  <nav class="bg-orbus-400 p-4 text-white fixed top-0 w-full">
    <div class="container mx-auto align-middle flex justify-between md:max-w-xl">
      <a href="/" class="self-center">
        <NavLogo class="h-8 self-center text-white" />
      </a>
      <div class="flex gap-1">
        <RouterLink
          to="/"
          class="flex flex-center items-center gap-2 text-white py-2 px-4 hover:bg-orbus-700 transition-all rounded-full font-bold"
        >
          <BookmarkIcon class="w-4 h-4" />
          My Stops
        </RouterLink>
        <!-- <RouterLink
          to="/map"
          class="flex flex-center items-center gap-2 text-white py-2 px-4 hover:bg-orbus-700 transition-all rounded-full font-bold"
        >
          <MapIcon class="w-4 h-4" />
          Map
        </RouterLink> -->
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  z-index: 1000;
}
</style>
