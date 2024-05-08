<template>
  <MapboxMap :accessToken="accessToken" class="w-full h-80">
    <mapbox-geolocate-control position="top-left" />
    <mapbox-marker :lngLat="[170.5006128, -45.8738144]">
      <mapbox-popup>
        <div>I am the content of an attached Popup</div>
      </mapbox-popup>
    </mapbox-marker>
  </MapboxMap>
</template>

<script setup>
import { MapboxMap } from 'vue-mapbox-ts'
const accessToken =
  'pk.eyJ1IjoibmF0aGFuaG9sbG93cyIsImEiOiJjbDlrdHNmb2wwZnh1M25waGw5cnpmYnhpIn0.nP2qRwkxz9Wzho0ym2J1mA'
</script>

<style>
.map-container {
  flex: 1;
}
</style>
