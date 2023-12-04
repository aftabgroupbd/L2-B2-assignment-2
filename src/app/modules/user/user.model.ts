import { Schema, model } from "mongoose";
import { TUser, TUserAddress, TUserName, TUserOrders, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";



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

// password hash hook 
userSchema.pre('save',async function(next){

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // document
  user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))
  next();
})

// password empty hook
userSchema.post('save',async function(doc,next){
  next();
})

// create a custom static methods 
userSchema.statics.isUserExists = async function(id:number){
  const existingUser = await User.findOne({userId:id});
  return existingUser;
}
userSchema.statics.isUserNameExists = async function(username:string){
  const existingUser = await User.findOne({username:username});
  return existingUser;
}

export const User = model<TUser, UserModel>('User', userSchema);