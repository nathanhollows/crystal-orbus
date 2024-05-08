<template>
  <main>
    <BusStopGroup v-for="group in groups" :key="group.name" :group="group" />
  </main>
</template>

<script lang="ts">
import BusStopGroup from '@/components/BusStopGroup.vue'
import { fetchBusStop } from '@/services/BusTrackerAPI'
import { type BusStopData } from '@/types/BusStopData'
import { type BusStopGroupData } from '@/types/BusStopGroupData'
import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'

export default {
  components: { BusStopGroup },
  setup() {
    const busStops: Ref<BusStopData[]> = ref([])
    const groups: Ref<BusStopGroupData[]> = ref([
      { name: 'From University', stops: ['0364', '0011'], data: [] },
      { name: 'From Roslyn', stops: ['0424', '0952'], data: [] },
      { name: 'Bus Hub to Rosyln', stops: ['5003', '5002'], data: [] }
    ])

    const updateStops = async (): Promise<void> => {
      // Fetch all the bus stops in each group
      await Promise.all(
        groups.value.map(async (group) => {
          const stops = await Promise.all(
            group.stops.map(async (stopID) => {
              return await fetchBusStop(stopID)
            })
          )
          group.data = stops
        })
      )
    }

    const intervalID: Ref<number | null> = ref(null)

    onMounted(() => {
      updateStops()
      intervalID.value = setInterval(updateStops, 15000)
    })

    onUnmounted(() => {
      if (intervalID.value) {
        clearInterval(intervalID.value)
      }
    })

    return { busStops, groups }
  }
}
</script>
