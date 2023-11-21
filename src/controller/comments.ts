import {  Request,Response } from "express";
import { Comments } from "../service/comments";


export const comments = async (req:Request, res:Response)=>{
    try{
      const author = req.headers.name as string
      const {comment,id} = req.body 
      const comments = new Comments(author,comment,id)
      await comments.setComments()
      const post = comments.geComments()
      console.log(post)
      res.send(post)
    
    
    }catch(err){
      const error = err as Error;
      res.status(400).send(error.message)
  };
  
  }