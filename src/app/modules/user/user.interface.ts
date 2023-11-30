import { Model } from "mongoose";

export type TUserName = {
    firstName: string;
    lastName: string;
};

export type TUserAddress = {
    street: string;
    city: string;
    country: string;
};
export type TUserOrders = {
    productName: string;
    price: number;
    quantity: number;
};

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
    isUserExists(id:string): Promise<TUser | null>;
  }
