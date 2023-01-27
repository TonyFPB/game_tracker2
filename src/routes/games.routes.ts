import { Router } from "express";
import { postGame, getGame,putGame, deleteGame } from "../controllers/games.controllers.js";
import { gameConflict, validateType, validateGameIdPut, validateGameIdDelete } from "../middlewares/games.middlewares.js";
// import { deleteGame, getGame, postGame, putGame } from "../controllers/games.controllers.js";
import { validationSchema } from "../middlewares/validateSchemas.js";
import gameSchema from "../schemas/games.schema.js";

const gamesRoutes = Router()

gamesRoutes.get('/games', getGame)
gamesRoutes.post('/games', validationSchema(gameSchema), postGame)
gamesRoutes.put('/games/:user_id/:game_id', putGame)
gamesRoutes.delete('/games/:user_id/:game_id', deleteGame)

export default gamesRoutes