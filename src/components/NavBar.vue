<script setup lang="ts"></script>
<template>
  <nav class="bg-orbus-500 p-4 text-white">
    <div class="container mx-auto align-middle flex justify-between md:max-w-xl">
      <h1 class="text-lg">Crystal Orbus</h1>
      <div class="flex gap-3">
        <RouterLink to="/" class="text-white p-2 hover:bg-orbus-700 rounded font-bold"
          >My Stops</RouterLink
        >
        <RouterLink to="/map" class="text-white p-2 hover:bg-orbus-700 rounded font-bold"
          >Map</RouterLink
        >
      </div>
    </div>
  </nav>
</template>
