import e, { Request, Response } from "express";
import { GameEntity, GameInsertType, NewGame } from "../protocols/game.protocols.js";
import gamesServices from "../services/games.services.js";
// import { delGame, findAllGames, findGamesWithQuery, insertGame, updateGame } from "../repositories/games.repositories.js";


export async function getGame(req: Request, res: Response): Promise<void> {
    const game = req.query.game as string
    try {
        const games = await gamesServices.getGames(game)
        res.send(games)
    } catch (err) {
        const e = err()
        if (e.name === 'NotFoundError') {
            res.sendStatus(404)
            return
        }
        res.sendStatus(500)
    }
}

export async function postGame(req: Request, res: Response): Promise<void> {
    const newUserGame = req.body as NewGame
    newUserGame.userName = newUserGame.userName.toLowerCase()
    newUserGame.game = newUserGame.game.toLowerCase()
    newUserGame.type = newUserGame.type.toLowerCase()

    try {
        await gamesServices.postNewGame(newUserGame)
        res.sendStatus(201)
    } catch (err) {
        const e = err()
        console.log(e)
        if (e.name === "UserNotFound") {
            res.status(404).send(e)
        }
        if (e.name === "Unprocessable") {
            res.status(422).send({ name: e.name, message: "Type does't match the type of the game " })
        }
        if (e.name === "ConflictError") {
            res.status(409).send({ name: e.name, message: "The game already exists for the user" })
        }
        console.log(err)
        res.sendStatus(500)
    }

}

export async function putGame(req: Request, res: Response): Promise<void> {
    const user_id: string = req.params.user_id
    const game_id: string = req.params.game_id

    try {
        await gamesServices.updateGame(user_id, game_id)
        res.sendStatus(200)
    } catch (err) {
        const e = err()
        if (e.name === 'NotFoundError') {
            res.status(404).send(e)
            return
        }
        if (e.name === 'BadRequest') {
            res.status(400).send(e)
            return
        }
        res.sendStatus(500)
    }
}

// export async function deleteGame(req: Request, res: Response): Promise<void> {
//     const game = res.locals as GameEntity
//     try {
//         await delGame(game.id)
//         res.sendStatus(200)
//     } catch (err) {
//         console.log(err)
//         res.sendStatus(500)
//     }
// }