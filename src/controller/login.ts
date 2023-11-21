import {  Request,Response } from "express";
import { Login} from "../service/login";
  

export const signIn = async (req:Request, res:Response)=>{
    try{
      
      const { email, password} = req.body;
      const login = new Login(email, password)
      const authenticate = await login.authenticateUser()
      res.cookie('token', authenticate, { httpOnly: true }).json({ message: 'Autenticação bem-sucedida.' });
    
    }catch(err){
      const error = err as Error;
      res.status(400).json(error.message)
      
    
       
    }
  };

  




  //"carlosdaniiel286@gmail.com"
  

