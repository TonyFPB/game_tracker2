import Joi from "joi";

const gameSchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required()
})

export default gameSchema