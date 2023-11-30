import { Schema, model } from "mongoose";
import { TUser, TUserAddress, TUserName, TUserOrders, UserModel } from "./user.interface";




const userNameSchema = new Schema<TUserName>({
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [10, 'First name max allowed length is 20'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required'],
      maxlength: [10, 'Last name max allowed length is 20'],
    },
});
const UserAddressSchema = new Schema<TUserAddress>({
    street: {
      type: String,
      required: [true, 'Street is required'],
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      required: [true, 'City is required'],
    },
    country: {
      type: String,
      trim: true,
      required: [true, 'Country is required'],
    },
});
const UserOrdersSchema = new Schema<TUserOrders>({
    productName: {
      type: String,
      required: [true, 'Product name is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
});

const userSchema = new Schema<TUser, UserModel>({
        userId: { type: Number, required: true, unique: true },
        username : { type: String, required: true, unique: true },
        password: { type: String, required: true, maxlength:[20,"Password can not be more than 20 charecters"]},
        fullName : {
        type: userNameSchema,
        required: true,
        },
        age :{ type:Number,required:true },
        email :{ type:String,required:true },
        isActive: {
            type: Boolean,
            default: true,
        },
        hobbies:{
            type: [String],
            required: true,
        },
        address: {
            type: UserAddressSchema,
            required: true,
        },
        orders: {
            type: [UserOrdersSchema],
            required: true,
        },
    },{
    toJSON:{
      virtuals:true
    }
});

export const User = model<TUser, UserModel>('User', userSchema);