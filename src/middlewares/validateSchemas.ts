import { Request, Response, NextFunction } from "express"
import { ObjectSchema } from "joi"

export function validationSchema(schemaValidate: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const body = req.body
        const { error } = schemaValidate.validate(body, { abortEarly: false })
        if (error) {
            res.status(422).send({ message: error.details.map(d => d.message) })
            return;
        }
        next()
    }
}
