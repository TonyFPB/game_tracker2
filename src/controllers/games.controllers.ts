import { Request, Response } from "express";
import { GameInsertType } from "../protocols/game.protocols.js";
import { insertGame } from "../repositories/games.repositories.js";


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