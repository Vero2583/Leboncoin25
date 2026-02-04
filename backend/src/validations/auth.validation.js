import Joi from 'joi'

export const registerSchema = Joi.object({
    email: Joi.string().email().min(5).required().messages({"message" : "l'email est requis"}),
    password: Joi.string().min(3).max(50).required(),
    avatar: Joi.string()
    
})

export const loginSchema = Joi.object({
    email: Joi.string().email().min(5).required().messages({"message" : "l'email est requis"}),
    password: Joi.string().min(3).max(50).required(),
    avatar: Joi.string()
})