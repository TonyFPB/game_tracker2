import { Request, Response } from "express";
import { NewGame } from "../protocols/game.protocols";
import gamesServices from "../services/games.services";



export async function getGame(req: Request, res: Response): Promise<void> {
    const game = req.query.game as string
    try {
        const games = await gamesServices.getGames(game)
        res.send(games)
    } catch (err) {
       
        if (err.name === 'NotFoundError') {
            res.sendStatus(404)
            return
        }
        res.sendStatus(500)
    }
}

export async function getAllGamesUser(req:Request, res: Response){
    const user_id: string = req.params.user_id
    try{
        const userData = await gamesServices.getGameUser(user_id)
        res.send(userData)
    }catch(err){
        
        if(err.name === "NotFoundError"){
            res.status(404).send(err)
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
      
        console.log(err)
        if (err.name === "NotFoundError") {
            res.status(404).send(err)
            return
        }
        if (err.name === "Unprocessable") {
            res.status(422).send(err)
            return
        }
        if (err.name === "ConflictError") {
            res.status(409).send(err)
            return
        }
        
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
        
        if (err.name === 'NotFoundError') {
            res.status(404).send(err)
            return
        }
        if (err.name === 'BadRequest') {
            res.status(400).send(err)
            return
        }
        res.sendStatus(500)
    }
}

export async function deleteGame(req: Request, res: Response): Promise<void> {
    const user_id: string = req.params.user_id
    const game_id: string = req.params.game_id
    
    try {
        await gamesServices.deleteGame(user_id,game_id)
        res.sendStatus(200)
    } catch (err) {
        
        if (err.name === 'NotFoundError') {
            res.status(404).send(err)
            return
        }
        if (err.name === 'BadRequest') {
            res.status(400).send(err)
            return
        }
        res.sendStatus(500)
    }
}