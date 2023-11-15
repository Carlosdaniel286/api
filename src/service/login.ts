import jwt from 'jsonwebtoken';
import prisma from '../database/prisma';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();


export class Login {
    private email=''
    private password=''

    constructor(email:string,password:string){
      this.email =email
      this.password = password
    }

    async generateToken(userId:string){
        try{
            const secretKey = process.env.SECRET_KEY as string;
            const expiresIn = '1h'; // Pode ajustar o tempo de expiração
            const token = jwt.sign({ userId }, secretKey, { expiresIn });
            return token;
        }catch(err){
            console.log(err)
            return false
        }
    }

    async authenticateUser (){
    try{
        const user = await prisma.user.findUnique({ where: { email:this.email } })
        if(!user) return false
        const authenticated =  await bcrypt.compare(this.password, user.password)
        if(!authenticated) return false
         const token = await this.generateToken(user.id.toString())
        if(!token) return false
        return token
    
    }catch(err){
        //console.log(err)
        throw err
    }
    }
}