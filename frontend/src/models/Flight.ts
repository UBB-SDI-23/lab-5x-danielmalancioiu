import { Airline } from "./Airline";

export interface Flight {
    id?: number;
    callSign: string;
    capacity: number;
    departureAirport: string;
    arrivalAirport: string;
    numberOfBookings?: number;
    airline?: Airline;
    airlineId?: number;
    [key: string]: any;
}

