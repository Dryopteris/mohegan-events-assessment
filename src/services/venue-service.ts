import { VenueItem } from '../types/venue'

const SIMULATED_LATENCY = 400

export async function getVenueById(id: string): Promise<VenueItem | undefined> {
    return new Promise((resolve) => {
        setTimeout(() => { 
            resolve({id: 'id1', name: 'fakeName', address: 'fakeAddress'})
        }, SIMULATED_LATENCY)
    })
}