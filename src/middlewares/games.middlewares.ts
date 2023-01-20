import { Request, Response, NextFunction } from "express";
import { Game, GameEntity } from "../protocols/game.protocols.js";
import { findGameById, findGameByName } from "../repositories/games.repositories.js";
import { createType, findTypeByName } from "../repositories/types.repositories.js";
import gameSchema from "../schemas/games.schema.js";


export function gamesValidate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body as Game
    const { error } = gameSchema.validate(body, { abortEarly: false })
    if (error) {
        res.status(422).send({ message: error.details.map(d => d.message) })
        return;
    }
    next()
}

export async function gameConflict(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body as Game
    try {
        const gamesExists = await findGameByName(body.name.toLowerCase())
        if (gamesExists.rowCount > 0) {
            res.sendStatus(409)
            return;
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}

export async function validateType(req: Request, res: Response, next: NextFunction): Promise<void> {
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

export async function validateGameIdPut(req: Request, res: Response, next: NextFunction): Promise<void> {
    const game_id: string = req.params.game_id
    try {
        if (isNaN(Number(game_id))) {
            res.sendStatus(404)
            return;
        }

        const gamesExists = await findGameById(Number(game_id))
        if (gamesExists.rowCount === 0) {
            res.sendStatus(404)
            return;
        }
        if (gamesExists.rows[0].completed) {
            res.status(400).send({ message: "The game is already finished." })
            return;
        }
        res.locals = gamesExists.rows[0] as GameEntity
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}

export async function validateGameIdDelete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const game_id: string = req.params.game_id
    try {
        if (isNaN(Number(game_id))) {
            res.sendStatus(404)
            return;
        }

        const gamesExists = await findGameById(Number(game_id))
        if (gamesExists.rowCount === 0) {
            res.sendStatus(404)
            return
        }
        if (!gamesExists.rows[0].completed) {
            res.status(400).send({ message: "The game is not finished yet." })
            return;
        }
        res.locals = gamesExists.rows[0] as GameEntity
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}