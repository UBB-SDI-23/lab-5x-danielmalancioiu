import { Flight } from "./Flight";
import { Passenger } from "./Passenger";

export interface Booking {
    id?: number;
    flightId?: number;
    passengerId?: number;
    flight?: Flight;
    passenger?: Passenger;
    seatNumber: string;
    date: string;
    price: number;
}

