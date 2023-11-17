import { NextFunction,Request,Response } from "express";
import { MeuErro } from "../service/login";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

type Token ={
    userId: number
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  try{
      const cookies =req.headers.cookie
      if(!cookies) throw new MeuErro('sem cookies')
      
      const auth = cookies.includes('token=')
      if(!auth) throw new MeuErro('sem token ou token corrupido')
      const token = cookies.split('=')[1]
      
      const secretKey = process.env.SECRET_KEY as string;
      const verique = jwt.verify(token, secretKey) as Token
     console.log(verique.userId)
    
      next();
  }catch(err){
    console.log(err)
    if(err instanceof JsonWebTokenError){
     res.send('token invalido')
     return
    }
    const error= err as Error
    res.send(error.message)
    }
    
}