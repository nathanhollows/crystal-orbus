<script setup lang="ts">
import TimetableRow from '@/components/TimetableRow.vue'
import TimetableRowPlaceholder from '@/components/TimetableRowPlaceholder.vue'
import { type BusStopData } from '@/types/BusStopData'
import { computed } from 'vue'
import { transformAndSortBusData } from '@/utils/TransformAndSort'
// define props
const props = defineProps<{ data: BusStopData[] }>()
const sortedBusStops = computed(() => transformAndSortBusData(props.data))
</script>

<template>
  <table class="min-w-full leading-normal border-t">
    <thead>
      <tr>
        <th
          class="px-5 py-3 border-b-2 border-gray-300 text-xs font-semibold text-gray-600 uppercase tracking-wider w-16 text-center"
        >
          Bus
        </th>
        <th
          class="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          Route & Destination
        </th>
        <th
          class="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-24"
        >
          Est. Departure
        </th>
      </tr>
    </thead>
    <tbody>
      <TimetableRow v-for="bus in sortedBusStops" :key="bus.tripId" :bus="bus" />
      <tr class="" v-for="(bus, key) in sortedBusStops" :key="key">
        <td class="px-5 py-5 border-b border-gray-200 text-sm">
          <div class="flex justify-center items-center">
            <span
              class="block rounded-full bg-black text-white text-center px-3 py-1 text-sm font-semibold"
              >{{ bus.lineNumber }}</span
            >
          </div>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 text-sm">
          <p class="text-gray-900 whitespace-no-wrap">
            {{ bus.destinationName }}
            <br />
            <span class="text-xs text-gray-500">{{ bus.stopName }}</span>
          </p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200">
          <p class="text-gray-900 whitespace-no-wrap">
            {{ bus.departureTime }} {{ bus.departureTime === 1 ? 'min' : 'mins' }}
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
/* Scoped styles for 2n rows */
tbody tr:nth-child(2n) {
  background-color: #f3f4f6; /* Tailwind's gray-100 */
}
</style>
