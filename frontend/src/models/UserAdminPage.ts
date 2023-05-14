import { Role } from "./Role";

export interface UserAdminPage {
    id: string,
    username: string,
    roles: Role[],
    [key: string]: any;
}