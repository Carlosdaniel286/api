import {  Request,Response } from "express";
import {Publication}  from "../service/publication";

export const publication = async (req:Request, res:Response)=>{
    try{
      const {content} = req.body 
      const author = req.headers.name as string
      const id = Number(req.headers.user)
      const posts = new Publication(author,content,id)
      await posts.setPublication()
      const post = await posts.getPublication()
      
      res.json(post)

    }catch(err){
      const error = err as Error;
      res.status(400).send(error.message)
  };

}



export const Feed = async (req:Request, res:Response)=>{
  try{
    const id = Number(req.headers.user)
    const post = await Publication.Feed(id)
    res.send(post)
  
  
  }catch(err){
    const error = err as Error;
    res.status(400).send(error.message)
};

}