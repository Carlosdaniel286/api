import {  Request,Response } from "express";
import {Publication}  from "../service/publication";
import { Comments } from "../service/comments";
export const publication = async (req:Request, res:Response)=>{
    try{
      const {Post} = req.body 
      const author = req.headers.name as string
      const id = Number(req.headers.user)
      const posts = new Publication(author,Post,id)
      await posts.setPublication()
      const post = await posts.getPublication()
      
      res.json(post)

    }catch(err){
      const error = err as Error;
      res.status(400).send(error.message)
  };

}

export const Coments = async (req:Request, res:Response)=>{
  try{
    const author = req.headers.name as string
    const {comment,id} = req.body 
    const comments = new Comments(comment,author,id)
    await comments.setComments()
    const post = comments.geComments()
    console.log(post)
    res.send(post)
  
  
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