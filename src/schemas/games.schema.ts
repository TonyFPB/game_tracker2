import Joi from "joi";

const gameSchema = Joi.object({
    userName: Joi.string().required(),
    game: Joi.string().required(),
    type: Joi.string().required()
})

export default gameSchema