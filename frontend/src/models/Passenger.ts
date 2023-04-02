import { Booking } from "./Booking";

export interface Passenger {
    id: number;
    firstName: string;
    lastName: string;
    dateOFBirth: string;
    nationality: string;
    passportNumber: string;
    bookings: Booking[];
}

