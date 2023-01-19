import { Router } from "express";
import { gamesValidate, gameConflict, validateType, validateGameIdPut, validateGameIdDelete } from "../middlewares/games.middlewares.js";
import { deleteGame, getGame, postGame, putGame } from "../controllers/games.controllers.js";
const gamesRoutes = Router()

gamesRoutes.get('/games', getGame)
gamesRoutes.post('/games', gamesValidate, gameConflict, validateType, postGame)
gamesRoutes.put('/games/:game_id', validateGameIdPut, putGame)
gamesRoutes.delete('/games/:game_id', validateGameIdDelete, deleteGame)

export default gamesRoutes