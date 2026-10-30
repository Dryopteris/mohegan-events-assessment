import eventsDataResponse from '../data/all-events.json'
import { EventItem, EventsResponse } from '../types/event'

const SIMULATED_LATENCY = 2000

export async function getEventDataResponse(): Promise<EventsResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(eventsDataResponse as EventsResponse)
        }, SIMULATED_LATENCY)
    })
    
}

export async function getEventById(id: string): Promise<EventItem | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const eventsResponse = eventsDataResponse as EventsResponse
            const eventItem = eventsResponse.events.find(item => item.id === id) 
            resolve(eventItem)
        }, SIMULATED_LATENCY)
    })
}