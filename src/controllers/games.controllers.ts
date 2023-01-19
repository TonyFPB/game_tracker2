import { Request, Response } from "express";
import { GameEntity, GameInsertType } from "../protocols/game.protocols.js";
import { delGame, findAllGames, findGamesWithQuery, insertGame, updateGame } from "../repositories/games.repositories.js";


export async function getGame(req: Request, res: Response) {
    const game = req.query.game as String
    try {
        if (game) {
            const games = await findGamesWithQuery(game.toLowerCase())
            if (games.rowCount === 0) {
                return res.sendStatus(404)
            }
            return res.send(games.rows)
        }
        if (!game) {
            const games = await findAllGames()
            return res.send(games.rows)
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function postGame(req: Request, res: Response) {
    const game = res.locals as GameInsertType
    try {
        await insertGame(game.name, game.type_id)
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function putGame(req: Request, res: Response) {
    const game = res.locals as GameEntity
    try {
        await updateGame(game.id)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function deleteGame(req: Request, res: Response) {
    const game = res.locals as GameEntity
    try {
        await delGame(game.id)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}