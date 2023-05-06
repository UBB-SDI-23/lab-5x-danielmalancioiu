import { Booking } from "./Booking";

export interface Passenger {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
    numberOfBookings?: number;
    averagePrice?: number;
    bookings?: Booking[];
    [key: string]: any;
}

