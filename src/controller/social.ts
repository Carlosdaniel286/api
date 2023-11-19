import {  Request,Response } from "express";
import {Publication}  from "../service/publication";
export const publication = async (req:Request, res:Response)=>{
    try{
      const {Post} = req.body 
      const author = req.headers.name as string
      const id = Number(req.headers.user)
      await Publication.setPublication(author,Post,id)
      const post = await Publication.getPublication()
      res.json(post)

    }catch(err){
      const error = err as Error;
      res.status(400).send(error.message)
  };

}

export const Coments = async (req:Request, res:Response)=>{
  try{
    const {comment} = req.body 
    await Publication.setComments(comment)
    const post = await Publication.getPublication()
    console.log(post)
    res.send(post)
  
  
  }catch(err){
    const error = err as Error;
    res.status(400).send(error.message)
};

}