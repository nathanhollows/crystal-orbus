export interface BusStopData {
  stop: StopInfo
  nextStopVisits: NextStopVisit[]
}

interface StopInfo {
  id: string
  name: string
  code: string
  location: {
    latitude: number
    longitude: number
  }
  zone: string
  platformCode: string
  parentStation: string
  station: boolean
}

interface NextStopVisit {
  directionOfLine: DirectionOfLine
  stopVisits: StopVisit[]
}

interface DirectionOfLine {
  lineNumber: string
  destinationName: string
  direction: number
  lineIdentifier: {
    shortName: string
    type: string
  }
}

interface StopVisit {
  arrivalCancelled: boolean
  departureCancelled: boolean
  index: number
  stopName: string
  scheduledMinutesUntilDeparture: number
  estimatedMinutesUntilDeparture: number | null
  stopVisitCancelled: boolean
  estimatedArrivalTime: number | null
  estimatedDepartureTime: number | null
  scheduledArrivalTime: number | null
  scheduledDepartureTime: number
  timingPoint: boolean
  atStop: boolean
  tripId: string
  platformCode: string
}
