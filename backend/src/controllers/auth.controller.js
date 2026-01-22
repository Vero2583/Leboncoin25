import argon2 from "argon2"
import jwt from "jsonwebtoken"
import { findUserByEmail, createUser } from "../models/user.model.js"
import { registerSchema, loginSchema } from "../validations/auth.validation.js";


// inscription

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const avatar = req.file ? req.file.filename : null;

    const { error } = registerSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Cet email est déja utilsé " });
    }

    const hash = await argon2.hash(password);

    await createUser({ email, password: hash, avatar });
    res.status(201).json({ message: "Utilisateur créé " });
  } catch (error) {
    console.error("Erreur sur l'enregistrement", error.message);
    res.status(500).json({ message: "erreur serveur", message: error.message });
  }
};


// login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé " });
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res
        .status(401)
        .json({ message: "email ou mot de passe invalide " });
    }

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}

    );

    res.json({token})
  } catch (error) {
    console.error("Erreur sur le login ", error.message);
    res.status(500).json({ message: "erreur serveur", message: error.message });
  }
};
 