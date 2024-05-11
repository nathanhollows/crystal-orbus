<template>
  <main>
    <BusStopGroup v-for="group in groups" :key="group.name" :group="group" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import type { BusStopGroupData } from '@/types/BusStopGroupData'
import BusStopGroup from '@/components/BusStopGroup.vue'
import { fetchBusStop } from '@/services/BusTrackerAPI'

// Receive props using defineProps
const props = defineProps<{
  routeName: string
  stops: string
}>()

// Clean route name
let route = props.routeName
route = route.replace(/-/g, ' ')

const stopsSegment = props.stops.match(/([0-9-]+)/)?.[1] ?? ''
const stopsArray = stopsSegment.replace(/-/g, ' ').split(' ')

const groups: Ref<BusStopGroupData[]> = ref([{ name: route, stops: stopsArray, data: [] }])

const updateStops = async (): Promise<void> => {
  await Promise.all(
    groups.value.map(async (group) => {
      const stopsData = await Promise.all(
        group.stops.map(async (stopID) => {
          return await fetchBusStop(stopID)
        })
      )
      group.data = stopsData
    })
  )
}

const intervalID = setInterval(updateStops, 15000)

onMounted(async () => {
  await updateStops()
})

onUnmounted(() => {
  clearInterval(intervalID)
})
</script>
