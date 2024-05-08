import { type BusStopData } from './BusStopData'

export interface BusStopGroupData {
  name: string
  stops: string[]
  data: BusStopData[]
}

export interface BusDisplayInfo {
  lineNumber: string
  destinationName: string
  stopName: string
  departureTime: number // This will either be the estimated or the scheduled departure time
}
