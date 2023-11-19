import { Comments } from "./comments";
import { MeuErro } from "./login";
import prisma from '../database/prisma';

type obj = {
  author: string;
  comment: string;
};

export class Publication {
  private  id = 0;
  private  idUser=0
  private  author = '';
  private  post = '';
  private  comments: obj[] = [];
 
  constructor(author: string, post: string,idUser:number){
    this.post=post,
    this.author=author
    this.idUser=idUser
  }
  

   async setPublication() {
    if (this.post === '') throw new MeuErro('sem posts');
    
   
    const novoPost = await prisma.post.create({
        data: {
          post:this.post,
          author:this.author,
          idUser:this.idUser
        },
        include: {
          comments: true,
        },
      });
      this.author = novoPost.author;
      this.post = novoPost.post;
      this.comments = [];
      this.idUser=novoPost.idUser
      this.id =novoPost.id

      console.log(novoPost)
   }

 
   async getPublication() {
    return {
      idUser:this.idUser,
      id:this.id,
      author: this.author,
      post: this.post,
      comments: this.comments,
      
    };
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
