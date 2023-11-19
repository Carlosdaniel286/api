


export class Comments {
    private idPost:number
    private author =''
    private comment =''
    
  constructor(author:string,comment:string,idPost:number){
    this.author =author
    this.comment = comment
    this.idPost =idPost
    
   }
     async getIdpost(){
      return this.idPost
     }

     async getAuthor(){
      return this.author
     }

     async getComment(){
      return this.comment
     }


      geTOString(){
       const data={
        author:this.author,
        comment:this.comment,
        idPost:this.idPost
        } 
        return data
      
     } 
}