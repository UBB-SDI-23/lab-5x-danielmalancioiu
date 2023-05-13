export interface UserProfile {
    id?: number;
    bio: string;
    location: string;
    birthDate: string;  
    gender: string;
    status: string;
    [key: string]: any;
}

