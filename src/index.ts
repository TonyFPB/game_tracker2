import loadEnvs from "./config/envs";
import express from "express";
import "express-async-errors";
import gamesRoutes from "./routes/games.routes";
import usersRoutes from "./routes/users.routes";
import { handleErros } from "./middlewares/error.handling.middleware";

loadEnvs();

const server = express();
server.use(express.json());
server.use(handleErros);
server.use(gamesRoutes);
server.use(usersRoutes);



export default server;
