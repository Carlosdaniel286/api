import {  Request,Response } from "express";
import { User} from "../service/user";
import { Login} from "../service/login";


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

  export const CheckToken = async (req:Request, res:Response)=>{
    try{
     console.log('oi')
      res.send('deu')
    }catch(err){
      console.log(err)
      res.send('flaha')
  };

}




  //"carlosdaniiel286@gmail.com"
  

