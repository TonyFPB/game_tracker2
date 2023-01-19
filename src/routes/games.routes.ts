import { Router } from "express";
import { gamesValidate, gameConflict, validateType, validateGameId } from "../middlewares/games.middlewares.js";
import { getGame, postGame, putGame } from "../controllers/games.controllers.js";
const gamesRoutes = Router()

gamesRoutes.get('/games', getGame)
gamesRoutes.post('/games', gamesValidate, gameConflict, validateType, postGame)
gamesRoutes.put('/games/:game_id', validateGameId, putGame)
gamesRoutes.delete('/games/:game_id')

export default gamesRoutes