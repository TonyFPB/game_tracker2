import Joi from 'joi'

export const JobSchema = Joi.object({
    "name":Joi.string().required(),
    "salary":Joi.number().required(),
    "skills":Joi.array().required(),
    "until":Joi.string().required() || Joi.date().required()
})