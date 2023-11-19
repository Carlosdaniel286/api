import prisma from "../database/prisma"



export class Comments {
    private idPost:number
    private author =''
    private comment =''
    
  constructor(author:string,comment:string,idPost:number){
    this.author =author
    this.comment = comment
    this.idPost =idPost
    
   }
   async setComments() {
    const comments = new Comments(this.author, this.comment, this.idPost);
    const novoPost = await prisma.comment.create({
        data:comments.geComments()
      })
  console.log(novoPost)
 
}
geComments(){
       const data={
           author:this.author,
           comment:this.comment,
           idPost:this.idPost
        } 
        return data
      
     } 
}