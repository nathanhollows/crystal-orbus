// TransformAndSort.ts
import type { BusStopData } from '@/types/BusStopData'
import type { BusDisplayInfo } from '@/types/BusStopData'

export function transformAndSortBusData(busStopsData: BusStopData[]): BusDisplayInfo[] {
  const busDisplayInfo: BusDisplayInfo[] = []

  busStopsData.forEach((busStopData) => {
    busStopData.nextStopVisits.forEach((visit) => {
      visit.stopVisits.forEach((stopVisit) => {
        const departureTime =
          stopVisit.estimatedMinutesUntilDeparture ?? stopVisit.scheduledMinutesUntilDeparture

        busDisplayInfo.push({
          tripId: stopVisit.tripId,
          lineNumber: visit.directionOfLine.lineNumber,
          destinationName: visit.directionOfLine.destinationName,
          stopName: stopVisit.stopName,
          departureTime: departureTime
        })
      })
    })
  })

  // Sort by departureTime
  return busDisplayInfo.sort((a, b) => a.departureTime - b.departureTime)
}
