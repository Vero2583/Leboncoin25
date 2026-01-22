import Joi from 'joi'



export const annonceSchema = Joi.object({
    title: Joi.string().min(3).required(),
    price: Joi.number().positive().min(0).precision(2).required(),
    city: Joi.string().required(),
    category_id: Joi.number().required(),
    image: Joi.string()
})

