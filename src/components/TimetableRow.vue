<template>
  <tr>
    <td class="px-5 py-5 border-b border-gray-200 text-sm">
      <div class="flex justify-center items-center">
        <span
          class="block rounded-full bg-black text-white text-center px-3 py-1 text-sm font-semibold"
          >{{ props.bus.lineNumber }}</span
        >
      </div>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 text-sm">
      <p class="text-gray-900 whitespace-no-wrap">
        {{ props.bus.destinationName }}
        <br />
        <span class="text-xs text-gray-500">via {{ props.bus.stopName }}</span>
      </p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200">
      <p class="text-gray-900 whitespace-no-wrap">
        {{ getDepartureTime() }}
      </p>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { type BusDisplayInfo } from '@/types/BusStopData'
import { defineProps } from 'vue'
const props = defineProps<{ bus: BusDisplayInfo }>()

function getDepartureTime(): string {
  if (props.bus.departureTime === 0) {
    return 'Now'
  } else if (props.bus.departureTime === 1) {
    return '1 min'
  } else if (props.bus.departureTime < 60) {
    return `${props.bus.departureTime} mins`
  } else {
    const now = new Date()
    const departureTime = new Date(now.getTime() + props.bus.departureTime * 60000)
    return departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
}
</script>
