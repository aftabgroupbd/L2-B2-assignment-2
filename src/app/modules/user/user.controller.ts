import { Request, Response } from "express";
import userValidationSchema from "./user.validation";


// create new user function 
const createStudent = async(req:Request,res:Response) =>{
    try{
        const {user : userData}   = req.body;

        const zodParseData = userValidationSchema.parse(userData);

        res.status(200).json({
            success:true,
            message:"Student is created successfully",
            data:result
        });
    }catch(error : any){
        res.status(500).json({
            success:false,
            message: error.message || 'Something went wrong!',
            error:error
        })
        
    }
}
export const StudentControllers = {
    createStudent,
}