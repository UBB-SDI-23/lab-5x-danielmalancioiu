import { Flight } from "./Flight";

export interface Airline {
    id?: number;
    name: string;
    iataCode: string;
    fleetSize: number;  
    website: string;
    country: string;
    username?: string;
    numberOfFlights?: number;
    averageCapacity?: number;
    flights?: Flight[];
    [key: string]: any;
}

