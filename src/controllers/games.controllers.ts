import { Request, Response } from "express";
import { GameInsertType } from "../protocols/game.protocols.js";
import { findAllGames, findGamesWithQuery, insertGame } from "../repositories/games.repositories.js";


export async function getGame(req: Request, res: Response) {
    const { game } = req.query
    try {
        if (game) {
            const games = await findGamesWithQuery(game.toString().toLowerCase())
            if (games.rowCount === 0){
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