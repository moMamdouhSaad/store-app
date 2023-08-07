import { UserCredential } from "../enums/User.credentials.enum";

export interface User{
    username:string,
    role:UserCredential
}