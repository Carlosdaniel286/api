import jwt from 'jsonwebtoken';
import prisma from '../database/prisma';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
dotenv.config();

export class MeuErro extends Error {
    constructor(message: string) {
      super(message);
    }
  }

export class Login {
    private email:string=''
    private password:string=''

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
        if(typeof this.password!=='string') throw new MeuErro('erro de tipo, senha deve conter caracters')
        const user = await prisma.user.findUnique({ where: { email:this.email } })
        
        if(!user) throw new MeuErro('email incorreto')
        const authenticated =  await bcrypt.compare(this.password, user.password)
        
        if(!authenticated) throw new MeuErro('senha incorreta')
         
        const token = await this.generateToken(user.id.toString())
        
         if(!token)  throw new MeuErro('erro na geraçao de token')
        return token
    
    }catch(err){
       
        if(err instanceof PrismaClientValidationError){
            const message = err.message.toString().split('Argument')[1]
            if(!message) throw new MeuErro('erro na validaçao')
            throw new MeuErro(message)
            }
            
        if( err instanceof Error){
            const error = err as Error;
            console.log(error)
            throw new MeuErro(error.message)
            }

            throw new MeuErro('erro inseperado')

    }
}
}
//"carlosdaniiel286@gmail.com"