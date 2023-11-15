import { Request,Response } from "express";
import { User} from "../service/user";
import { Login} from "../service/login";

  export const creatUsers = async (req:Request, res:Response)=>{
    try{
    const { name, email, password } = req.body;
     const user= new User(name, email, password)
     const newUser = await user.creatUser()
     res.status(200).send(newUser)
    
    }catch(err){
     return res.status(500).send('falha ao criar um novo usuário')
    }
  };

  export const signIn = async (req:Request, res:Response)=>{
    try{
      
      const { email, password} = req.body;
      const login = new Login(email, password)
      const authenticate = await login.authenticateUser()
      if(!authenticate) return res.status(400).json({ message: 'falhou' })
      res.cookie('authToken', authenticate, { httpOnly: true }).json({ message: 'Autenticação bem-sucedida.' });
    
    }catch(err){
      if (err instanceof TypeError) {
        console.log('Erro do tipo TypeError:', err.message);
        // Trate o erro TypeError de maneira específica, se necessário
      }
        //console.log(error);
        // Trate o erro TypeError de maneira específica, se necessário
      
       res.status(400).json(err)
    }
  };

  

  

