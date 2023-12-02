/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser, TUserOrders } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
  
    const user_id:string = userData.userId.toString();
    let user;
    let error   = false;
    let message = 'User not found!';

    // check user id is already exists or not
    if(await User.isUserExists(user_id)){
        message = 'User id already exists!';
        error = true;
    }

    // check username is already exists or not
    if(await User.isUserNameExists(userData.username)){
        message = 'Username already exists!';
        error = true;
    }

    if(error === false)
    {
        const result = await User.create(userData);
        if(result){
            user = {
                userId: result.userId,
                username: result.username,
                fullName: {
                    firstName: result.fullName.firstName,
                    lastName: result.fullName.lastName,
                },
                age: result.age,
                email: result.email,
                isActive: result.isActive,
                hobbies: result.hobbies,
                address: {
                    street: result.address.street,
                    city: result.address.city,
                    country: result.address.country,
                },
            };
            error   = false;
            message = "User created successfully!";
        }
    }
    
  
  return {
    error:error,
    message:message,
    data:user
  };

};


const getUsersFromDB = async () => {
    let error       = true;
    let message     = 'User not found!';
    const result    = await User.find();
    let users:any   = [];

    if(result.length > 0){
        error   = false;
        message = "Users fetched successfully!";
        users = result.map((user: any) => {
            return {
                username: user.username,
                fullName: {
                    firstName: user.fullName.firstName,
                    lastName: user.fullName.lastName,
                },
                age: user.age,
                email: user.email,
                address: {
                    street: user.address.street,
                    city: user.address.city,
                    country: user.address.country,
                },
            };
        });
    }
    return {
        error:error,
        message:message,
        data:users
    };
};


const getSingleUserFromDB = async (userId: string) => {
    const result = await User.findOne({ userId:userId });
    let user;
    if(result)
    {
        user = {
            userId: result.userId,
            username: result.username,
            fullName: {
                firstName: result.fullName.firstName,
                lastName: result.fullName.lastName,
            },
            age: result.age,
            email: result.email,
            isActive: result.isActive,
            hobbies: result.hobbies,
            address: {
                street: result.address.street,
                city: result.address.city,
                country: result.address.country,
            },
        };
    }
    return user;
};

const updateSingleUserFromDB = async (userId: string,userData:TUser) => {

    // check user is already exists or not
    const updateUser = await User.isUserExists(userId);
    let user;
    let error   = true;
    let message = 'User not found!';
    if(updateUser){
        const result = await User.updateOne({userId:userId}, userData);

        if(result.modifiedCount >  0)
        {
            error   = false;
            message = 'User updated successfully!';

            const updateUser = await User.findOne({ userId:userId });
            user = {
                userId: updateUser?.userId,
                username: updateUser?.username,
                fullName: {
                    firstName: updateUser?.fullName.firstName,
                    lastName: updateUser?.fullName.lastName,
                },
                age: updateUser?.age,
                email: updateUser?.email,
                isActive: updateUser?.isActive,
                hobbies: updateUser?.hobbies,
                address: {
                    street: updateUser?.address.street,
                    city: updateUser?.address.city,
                    country: updateUser?.address.country,
                },
            };
        }else{
            message = 'User not updated!';
        }
    }
    return {
        message:message,
        data:user,
        error:error,
    };
};

const deleteSingleUserFromDB = async (userId: string) => {

    // check user is already exists or not
    const updateUser = await User.isUserExists(userId);
    let error   = true;
    let message = 'User not found!';
    if(updateUser){
        const result = await User.deleteOne({userId:userId});
        if(result.deletedCount >  0)
        {
            error   = false;
            message = 'User deleted successfully!';
        }
    }
    return {
        message:message,
        error:error,
    };
};

const addOrderIntoUserFromDB = async (userId: string,orderData:TUserOrders) => {

    // check user is already exists or not
    const updateUser = await User.isUserExists(userId);
    let error   = true;
    let message = "Order created failed!";
    if(updateUser){

        if(typeof updateUser.orders !== 'undefined'){
            const orders = updateUser.orders;
            orders.push(orderData)
            const update = { $set: { orders: orders } };
            const result = await User.updateOne({userId:userId}, update);
            if(result.modifiedCount >  0)
            {
                error   = false;
                message = "Order created successfully!";
            }else{
                message = "Order created failed!";
            }
        }
    }
    return {
        message:message,
        error:error,
    };
};
export const UserServices = {
    createUserIntoDB,
    getUsersFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteSingleUserFromDB,
    addOrderIntoUserFromDB,
};
