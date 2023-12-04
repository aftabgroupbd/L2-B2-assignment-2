/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

// define user name type 
export type TUserName = {
    firstName: string;
    lastName: string;
};

// define user adress 
export type TUserAddress = {
    street: string;
    city: string;
    country: string;
};

// define user order type 
export type TUserOrders = {
    productName: string;
    price: number;
    quantity: number;
};

// define user type 
export type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TUserName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: TUserAddress;
    orders?: TUserOrders[];
}

// create static methods 
export interface UserModel extends Model<TUser>{
    isUserExists(id:number): Promise<TUser | null>;
    isUserNameExists(username:string): Promise<TUser | null>;
}
