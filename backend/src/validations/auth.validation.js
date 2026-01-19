import Joi from 'joi'

export const registerSchema = Joi.object({
    name: Joi.string().name().min(3).required().message({"message" : "le nom est obligatoire"}),
    email: Joi.string().email().min(5).required().messages({"message" : "l'email est requis"}),
    password: Joi.string().min(3).max(50).required(),
    confirmPassword: Joi.string().min(3).max(50).required()
})

export const loginSchema = Joi.object({
    name: Joi.string().name().min(3).required().message({"message" : "le nom est obligatoire"}),
    email: Joi.string().email().min(5).required().messages({"message" : "l'email est requis"}),
    password: Joi.string().min(3).max(50).required(),
})