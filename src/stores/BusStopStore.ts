import { defineStore } from 'pinia'
import { fetchBusStop } from '@/services/BusTrackerAPI'
import { type BusStopGroupData } from '@/types/BusStopGroupData'

export const useBusStopStore = defineStore('busStopStore', {
  state: () => ({
    groups: [] as BusStopGroupData[]
  }),
  actions: {
    async fetchAndUpdateStops() {
      this.groups = JSON.parse(localStorage.getItem('busStopGroups') || '[]')

      await Promise.all(
        this.groups.map(async (group) => {
          const stops = await Promise.all(
            group.stops.map(async (stopID) => {
              return await fetchBusStop(stopID)
            })
          )
          group.data = stops
        })
      )

      localStorage.setItem('busStopGroups', JSON.stringify(this.groups))
    },
    async addGroup(group: BusStopGroupData) {
      this.groups.push(group)
      await this.fetchAndUpdateStops()
    }
  }
})
