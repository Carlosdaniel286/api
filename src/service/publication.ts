import { Comments } from "./comments";
import { MeuErro } from "./login";
import prisma from '../database/prisma';

type obj = {
  author: string;
  comment: string;
};

export class Publication {
  private static id = 0;
  private static idUser=0
  private static author = '';
  private static post = '';
  private static comments: obj[] = [];
 
  
  

  static async setPublication(author: string, post: string,idUser:number) {
    if (post === '') throw new MeuErro('sem posts');
    
   
    const novoPost = await prisma.post.create({
        data: {
          post,
          author,
          idUser:idUser
        },
        include: {
          comments: true,
        },
      });
      Publication.author = novoPost.author;
      Publication.post = novoPost.post;
      Publication.comments = [];
      Publication.idUser=novoPost.idUser
      Publication.id =novoPost.id

      console.log(novoPost)

}

  static async setComments(comment: string) {
    if (Publication.post === '') throw new MeuErro('sem posts');
    const comments = new Comments(Publication.author, comment, Publication.id);
   
    const novoPost = await prisma.comment.create({
        data:comments.geTOString()
        
  })
  console.log(novoPost)
  Publication.comments.push(novoPost);
}

  static async getPublication() {
    const allPublications = await prisma.post.findMany({
        include: {
          comments: true,
        },
      });
    return {
      idUser:Publication.idUser,
      id:Publication.id,
      author: Publication.author,
      post: Publication.post,
      comments: Publication.comments,
      Publications:allPublications
    };
  }

  static getComments() {
    return Publication.comments;
  }
}
