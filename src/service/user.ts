import prisma from '../database/prisma';
import bcrypt from 'bcrypt';
import { MeuErro } from './login';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
export class User {
    private name:string =''
    private email:string =''
    private password:string =''
    
    constructor(name:string,email:string,passworld:string){
        this.email =email
        this.name =name
        this.password =passworld

    }

    async creatUser(){
        try{
            if(typeof this.password!=='string') throw new MeuErro('erro de tipo, senha deve conter caracters')
             const hashedPassword = await bcrypt.hash(this.password, 10);
             await prisma.user.create({
                data: { email:this.email, name:this.name, password:hashedPassword},
              });
            return 'usuario criado com sucesso'
        }catch(err){
        
        if(err instanceof PrismaClientKnownRequestError){
            if(err.code == 'P2002')  throw new MeuErro('esse email ja existe')
            console.log(err.code)
            throw new MeuErro('deu errado')
          } 
          
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
