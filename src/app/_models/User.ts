import { Role } from "./role";


export class User {
   
    username: string;
    token: string; 
    password: string;
    email: string;
    enabled : boolean;
    firstName:string;
    lastName:string;
    phoneNumber: BigInteger;
    address:string;
    role :Role;

}

export const UserSchema = {
    isSelected: "isSelected",
    name: "text",
    email: "text",
    phone: "text",
    isEdit: "isEdit"
  }