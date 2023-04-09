export interface Airline {
    id?: number;
    name: string;
    iataCode: string;
    fleetSize: number;  
    website: string;
    country: string;
    [key: string]: any;
}

