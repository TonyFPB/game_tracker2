import { Request, Response, NextFunction } from "express";
import { Game } from "../protocols/game.protocols.js";
import { findGameByName } from "../repositories/games.repositories.js";
import { createType, findTypeByName } from "../repositories/types.repositories.js";
import gameSchema from "../schemas/games.schema.js";


export function gamesValidate(req: Request, res: Response, next: NextFunction) {
    const body = req.body as Game
    const { error } = gameSchema.validate(body, { abortEarly: false })
    if (error) {
        return res.status(422).send({ message: error.details.map(d => d.message) })
    }
    next()
}

export async function gameConflict(req: Request, res: Response, next: NextFunction) {
    const body = req.body as Game
    try {
        const gamesExists = await findGameByName(body.name.toLowerCase())
        if (gamesExists.rowCount > 0) {
            return res.sendStatus(409)
        }
        next()
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function validateType(req: Request, res: Response, next: NextFunction) {
    const body = req.body as Game
    body.name = body.name.toLocaleLowerCase()
    body.type = body.type.toLocaleLowerCase()
    try {
        const typeExists = await findTypeByName(body.type)
        if (typeExists.rowCount === 0) {
            await createType(body.type)
            const type = await findTypeByName(body.type)
            res.locals = { name: body.name, type_id: type.rows[0].id }
        }
        if (typeExists.rowCount > 0) {
            const type = await findTypeByName(body.type)
            res.locals = { name: body.name, type_id: type.rows[0].id }
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}