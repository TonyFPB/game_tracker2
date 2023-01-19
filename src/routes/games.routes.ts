import { Router } from "express";
import { gamesValidate, gameConflict, validateType } from "../middlewares/games.middlewares.js";
import { getGame, postGame } from "../controllers/games.controllers.js";
const gamesRoutes = Router()

gamesRoutes.get('/games', getGame)
gamesRoutes.post('/games', gamesValidate, gameConflict, validateType, postGame)
gamesRoutes.put('/games/:game_id')
gamesRoutes.delete('/games/:game_id')

export default gamesRoutes