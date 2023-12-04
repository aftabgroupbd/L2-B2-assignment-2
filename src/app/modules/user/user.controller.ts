/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import userValidationSchema, { TUserOrdersSchema } from "./user.validation";
import { UserServices } from "./user.service";


// create new user function 
const createUser = async(req:Request,res:Response) =>{
    try{
        const userData      = req.body;
        const zodParseData  = userValidationSchema.parse(userData);
        const result        = await UserServices.createUserIntoDB(zodParseData);
        if(result.error == false){
            res.status(200).json({
                success:true,
                message:result.message,
                data:result.data
            });
        }else{
            res.status(404).json({
                success:false,
                message:result.message,
                error: {
                    "code": 404,
                    "description": result.message,
                }
            });
        }
    }catch(error : any){
        let message = 'Something went wrong!';
        if(Object.prototype.hasOwnProperty.call(error, 'issues'))
        {
            message = error.issues[0].message;
        }else{
            message = error.message;
        }
        res.status(500).json({
            success:false,
            message:message,
            error: {
                "code": 404,
                "description": message
            }
        })
        
    }
}

// find all users function 
const getAllUser = async(req:Request,res:Response) =>{
    try{
        const result    = await UserServices.getUsersFromDB();
        res.status(200).json({
            success:true,
            message:"Users fetched successfully!",
            data:result.data
        });
    }catch(error : any){

        res.status(500).json({
            success:false,
            message:error.message || 'Something went wrong!',
            error: {
                "code": 500,
                "description": error.message || 'Something went wrong!'
            }
        })
        
    }
}
// find a user 
const getSingleUser = async(req:Request,res:Response) =>{
    try{
        const userId:number    = parseInt(req.params.userId);
        const result    = await UserServices.getSingleUserFromDB(userId);
        if(result){
            res.status(200).json({
                success:true,
                message:"User fetched successfully!",
                data:result
            });
        }else{
            res.status(404).json({
                success:false,
                message:"User not found!",
                error: {
                    "code": 404,
                    "description": "User not found!"
                }
            });
        }
        
    }catch(error : any){

        res.status(500).json({
            success:false,
            message:error.message || 'Something went wrong!',
            error: {
                "code": 404,
                "description": error.message || 'Something went wrong!'
            }
        })
        
    }
}

// update a user 
const updateSingleUser = async(req:Request,res:Response) =>{
    try{
        const userId:number    = parseInt(req.params.userId);
        const userData      = req.body;
        const zodParseData  = userValidationSchema.parse(userData);
        const result        = await UserServices.updateSingleUserFromDB(userId,zodParseData);
        if(result.error == false){
            res.status(200).json({
                success:true,
                message:result.message,
                data:result.data
            });
        }else{
            res.status(404).json({
                success:false,
                message:result.message,
                error: {
                    "code": 404,
                    "description": result.message,
                }
            });
        }
        
    }catch(error : any){

        let message = 'Something went wrong!';
        if(Object.prototype.hasOwnProperty.call(error, 'issues'))
        {
            message = error.issues[0].message;
        }else{
            message = error.message;
        }
        res.status(500).json({
            success:false,
            message:message,
            error: {
                "code": 404,
                "description": message
            }
        })
        
    }
}

// delete a user 
const deleteSingleUser = async(req:Request,res:Response) =>{
    try{
        const userId:number    = parseInt(req.params.userId);
        const result        = await UserServices.deleteSingleUserFromDB(userId);
        if(result.error == false){
            res.status(200).json({
                success:true,
                message:result.message,
                data:null
            });
        }else{
            res.status(404).json({
                success:false,
                message:result.message,
                error: {
                    "code": 404,
                    "description": result.message,
                }
            });
        }
        
    }catch(error : any){

        res.status(500).json({
            success:false,
            message:error.message || 'Something went wrong!',
            error: {
                "code": 404,
                "description": error.message || 'Something went wrong!'
            }
        })
        
    }
}

// add order into a user 
const addOrderIntoUser = async(req:Request,res:Response) =>{
    try{
        const userId:number    = parseInt(req.params.userId);
        const userData      = req.body;
        const zodParseData  = TUserOrdersSchema.parse(userData);
        const result        = await UserServices.addOrderIntoUserFromDB(userId,zodParseData);
        if(result.error == false){
            res.status(200).json({
                success:true,
                message:result.message,
                data:null
            });
        }else{
            res.status(404).json({
                success:false,
                message:result.message,
                error: {
                    "code": 404,
                    "description": result.message,
                }
            });
        }
        
    }catch(error : any){

        let message = 'Something went wrong!';
        if(error.hasOwnProperty('issues'))
        {
            message = error.issues[0].message;
        }else{
            if(error.hasOwnProperty('issues')){
                message = error.message;
            }
        }
        res.status(500).json({
            success:false,
            message:message,
            error: {
                "code": 404,
                "description": message
            }
        })
        
    }
}

// get orders of a user 
const getUserOrders = async(req:Request,res:Response) =>{
    try{
        const userId:number    = parseInt(req.params.userId);
        
        const result    = await UserServices.getUserOrdersFromDB(userId);
        if(result.error == false){
            res.status(200).json({
                success:true,
                message:result.message,
                data:result.data
            });
        }else{
            res.status(404).json({
                success:false,
                message:result.message,
                error: {
                    "code": 404,
                    "description": result.message,
                }
            });
        }
        
    }catch(error : any){

        res.status(500).json({
            success:false,
            message:error.message || 'Something went wrong!',
            error: {
                "code": 404,
                "description": error.message || 'Something went wrong!'
            }
        })
        
    }
}
// get orders of a user 
const getUserOrdersTotal = async(req:Request,res:Response) =>{
    try{
        const userId:number    = parseInt(req.params.userId);
        const result    = await UserServices.getUserOrdersTotalFromDB(userId);
        if(result.error == false){
            res.status(200).json({
                success:true,
                message:result.message,
                data:result.data
            });
        }else{
            res.status(404).json({
                success:false,
                message:result.message,
                error: {
                    "code": 404,
                    "description": result.message,
                }
            });
        }
        
    }catch(error : any){

        res.status(500).json({
            success:false,
            message:error.message || 'Something went wrong!',
            error: {
                "code": 404,
                "description": error.message || 'Something went wrong!'
            }
        })
        
    }
}

export const UserControllers = {
    createUser,
    getAllUser,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    addOrderIntoUser,
    getUserOrders,
    getUserOrdersTotal
}