import argon2 from "argon2"
import { UserModel } from "../models/user.model.js"
import { loginSchema, registerSchema } from "../src/validation/auth.validation.js"




export const register = async (req, res) => {
    try {
        
        const { name, email, password, create_at } = req.body

        if (!name || !email || !password || !create_at) {
            return res.status(400).json({ message: "Tous les champs sont requis"})
        }

        const existingUser = await UserModel.findByEmail(mail)

        if (existingUser) {
            return res.status(409).json({ message: "Email déjà utilisé"})     
        }

        const passwordHash = await argon2.hash(password)

        await UserModel.create(email, passwordHash)

        res.status(201).json({ message: "Utilisateur enregistré"})


    } catch (error) {
        console.error(error)
        res.status(500).json({ message : "erreur serveur", message: error.message})   
    }
}

export const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "validation echoué ",
        error: error.details[0].message,
      });
    }

    const {email, password} = req.body; 

const user = await userModel.findByEmail(email);

if(!user) {
    return res.status(401).json({message: "Identifiant ou mot de passe incorrecte "})
}

const isPasswordValid = await  argon2.verify(user.password, password)

if (!isPasswordValid) {
       return res.status(401).json({message: "Identifiant ou mot de passe incorrecte "}) 
}

res.status(200).json({message : "bssahatak la connextion", user: { id: user.id, email: user.email}})


  } catch (error) {
  console.error(error);
    res
      .status(500)
      .json({ message: "erreur du seurveur ", message: error.message });

  }
 
}