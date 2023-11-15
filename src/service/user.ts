import prisma from '../database/prisma';
import bcrypt from 'bcrypt';

export class User {
    private name =''
    private email =''
    private password =''

    constructor(name:string,email:string,passworld:string){
        this.email =email
        this.name =name
        this.password =passworld

    }

    async creatUser(){
        try{
            
            const hashedPassword = await bcrypt.hash(this.password, 10);
            const newUser = await prisma.user.create({
                data: { email:this.email, name:this.name, password:hashedPassword},
              });

              console.log(newUser)
              return newUser
        }catch(err){
        throw err
        }
    }
}