import { Router } from "express";
import { postGame, getGame,putGame, deleteGame, getAllGamesUser } from "../controllers/games.controllers";
import { validationSchema } from "../middlewares/validateSchemas";
import gameSchema from "../schemas/games.schema";

const gamesRoutes = Router()

gamesRoutes.get('/games', getGame)
gamesRoutes.get("/games/:user_id", getAllGamesUser)
gamesRoutes.post('/games', validationSchema(gameSchema), postGame)
gamesRoutes.put('/games/:user_id/:game_id', putGame)
gamesRoutes.delete('/games/:user_id/:game_id', deleteGame)

export default gamesRoutes