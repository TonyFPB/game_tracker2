import { Router } from "express";
import { postGame, getGame,putGame, deleteGame, getAllGamesUser } from "../controllers/games.controllers.js";
import { validationSchema } from "../middlewares/validateSchemas.js";
import gameSchema from "../schemas/games.schema.js";

const gamesRoutes = Router()

gamesRoutes.get('/games', getGame)
gamesRoutes.get("/games/:user_id", getAllGamesUser)
gamesRoutes.post('/games', validationSchema(gameSchema), postGame)
gamesRoutes.put('/games/:user_id/:game_id', putGame)
gamesRoutes.delete('/games/:user_id/:game_id', deleteGame)

export default gamesRoutes