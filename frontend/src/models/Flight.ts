import { Airline } from "./Airline";

export interface Flight {
    id: number;
    callSign: string;
    capacity: number;
    departureAirport: string;
    arrivalAirport: string;
    airline: Airline
}

