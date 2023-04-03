import { Booking } from "./Booking";

export interface Passenger {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
    averagePrice?: number;
    bookings?: Booking[];
}

