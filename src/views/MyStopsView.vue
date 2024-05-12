<template>
  <main class="mt-24">
    <BusStopGroup v-for="group in groups" :key="group.name" :group="group" />
  </main>
</template>

<script lang="ts">
import BusStopGroup from '@/components/BusStopGroup.vue'
import { useBusStopStore } from '@/stores/BusStopStore'
import { onMounted, onUnmounted } from 'vue'

export default {
  components: { BusStopGroup },
  setup() {
    const store = useBusStopStore()
    const groups = store.groups

    const updateStops = async () => {
      await store.fetchAndUpdateStops()
    }

    const intervalID = setInterval(updateStops, 15000)

    onMounted(() => {
      updateStops()
    })

    onUnmounted(() => {
      clearInterval(intervalID)
    })

    return { groups }
  }
}
</script>
