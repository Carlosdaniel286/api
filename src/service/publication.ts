import { MeuErro } from "./login";
import prisma from '../database/prisma';
import { newcomments } from "./comments";

type obj = {
  author: string;
  comment?: newcomments[];
  content:string
  id:number
};

export class Publication {
  private  idUser=0
  private  author = '';
  private  content = '';
  private post!: obj;
 
  
  constructor(author: string, content: string,idUser:number){
    this.content=content,
    this.author=author
    this.idUser=idUser
  }
  

   async setPublication() {
    if (this.content === '') throw new MeuErro('sem posts');
      const novoPost = await prisma.post.create({
        data: {
          content:this.content,
          author:this.author,
          idUser:this.idUser
        },
        include: {
          comments: true,
        },
      });
    
    this.post={
      author: novoPost.author,
      content:novoPost.content,
      id:novoPost.id,
     
      }
   }

 
   async getPublication() {
    return this.post
  }

  static async Feed(id:number) {
    const publication = await prisma.post.findMany({
        where: { idUser:id },
        include: {
          comments: true,
        },
      });
      return publication
}
}
