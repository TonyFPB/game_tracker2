import { Request, Response, NextFunction } from "express";
import { NewGame, GameEntity } from "../protocols/game.protocols.js";
import { findGameById, findGameByName } from "../repositories/games.repositories.js";
import { createType, findTypeByName } from "../repositories/types.repositories.js";



export async function gameConflict(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body as NewGame
    try {
        const gamesExists = await findGameByName(body.game.toLowerCase())
        if (gamesExists) {
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
    const body = req.body as NewGame
    body.game = body.game.toLocaleLowerCase()
    body.type = body.type.toLocaleLowerCase()
    try {
        const typeExists = await findTypeByName(body.type)
        if (!typeExists) {
            await createType(body.type)
            const type = await findTypeByName(body.type)
            res.locals = { name: body.game, type_id: type.id }
        }
        if (typeExists) {
            const type = await findTypeByName(body.type)
            res.locals = { name: body.game, type_id: type.id }
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
        if (!gamesExists) {
            res.sendStatus(404)
            return;
        }
        if (gamesExists.completed) {
            res.status(400).send({ message: "The game is already finished." })
            return;
        }
        res.locals = gamesExists as GameEntity
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
        if (!gamesExists) {
            res.sendStatus(404)
            return
        }
        if (!gamesExists.completed) {
            res.status(400).send({ message: "The game is not finished yet." })
            return;
        }
        res.locals = gamesExists as GameEntity
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}
