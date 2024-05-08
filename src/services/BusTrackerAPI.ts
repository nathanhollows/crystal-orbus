import axios from 'axios'
import type { BusStopData } from '@/types/BusStopData'

const API_BASE_URL = 'https://orc.mattersoft.fi/timetable/rest/stopdisplays/5900'

export const fetchBusStop = async (stopId: string): Promise<BusStopData> => {
  try {
    const response = await axios.get<BusStopData>(`${API_BASE_URL}${stopId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching bus stop data:', error)
    throw error
  }
}
