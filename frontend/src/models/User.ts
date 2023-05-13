export interface User{
    id: number;
    username: string;
    password: string;
    rowsPerPage?: number | 10;
    [key: string]: any;
}

