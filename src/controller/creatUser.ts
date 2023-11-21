import {  Request,Response } from "express";
import { User} from "../service/user";



  export const creatUsers = async (req:Request, res:Response)=>{
    try{
     const { name, email, password } = req.body;
     const user= new User(name, email, password)
     const newUser = await user.creatUser()
     res.status(200).send(newUser)
    
    }catch(err){
      const error = err as Error;
      res.status(400).send(error.message)
     };

}