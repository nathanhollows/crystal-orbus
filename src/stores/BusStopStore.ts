import { defineStore } from 'pinia'
import { fetchBusStop } from '@/services/BusTrackerAPI'
import { type BusStopGroupData } from '@/types/BusStopData'
import { ref, onUnmounted } from 'vue'

export const useBusStopStore = defineStore('busStopStore', {
  state: () => {
    // Parse and then ensure the parsed object is reactive
    const initialGroups = JSON.parse(
      localStorage.getItem('busStopGroups') || '[]'
    ) as BusStopGroupData[]
    return {
      groups: ref(initialGroups) // Make sure the groups are a reactive ref
    }
  },
  actions: {
    init() {
      const updateFromStorage = () => {
        this.groups = JSON.parse(localStorage.getItem('busStopGroups') || '[]')
      }

      window.addEventListener('storage', updateFromStorage)

      onUnmounted(() => {
        window.removeEventListener('storage', updateFromStorage)
      })
    },
    async fetchAndUpdateStops() {
      const promises = this.groups.map(async (group, index) => {
        const stops = await Promise.all(group.stops.map((stopID) => fetchBusStop(stopID)))
        const newGroup = { ...group, data: stops }
        this.groups[index] = newGroup // Reactively update each group
      })

      await Promise.all(promises)
    },
    async addGroup(group: BusStopGroupData) {
      if (this.isGroupInStore(group)) {
        alert('Group already exists!')
        return
      }
      this.groups.push(group)
      // remove the data property from the group
      this.groups = this.groups.map((g) => ({ ...g, data: [] }))
      localStorage.setItem('busStopGroups', JSON.stringify(this.groups))
      alert('Group added!')
    },
    async removeGroup(group: BusStopGroupData) {
      this.groups = this.groups.filter((g) => g.name !== group.name)
      localStorage.setItem('busStopGroups', JSON.stringify(this.groups))
      alert('Group removed!')
    },
    // Check if a BusStopGroupData is already in the store
    isGroupInStore(group: BusStopGroupData) {
      return this.groups.some((g) => g.name === group.name)
    }
  }
})
