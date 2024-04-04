import {IBase} from "@/types/root.types";

export interface AuthTypes{
    email: string,
    password: string
}

export interface User extends IBase{
    workInterval?: number;
    breakInterval?: number;
    intervalCount?: number;
}

export interface IAuthResponse{
    accessToken: string;
    user: User
}