import loadEnvs from "./config/envs";
import express from "express";
import "express-async-errors";
import gamesRoutes from "./routes/games.routes";
import usersRoutes from "./routes/users.routes";
import { handleErros } from "./middlewares/error.handling.middleware";
import usersRepository from "./repositories/users.repositories";

loadEnvs();

const server = express();
server.use(express.json());
// server.get('/health', async(req,res)=>{
//     const find = await usersRepository.findUserByName("klaus")
//     if(!find) throw {name:"Unprocessable", dobaloco:true} 
// })
server.use(gamesRoutes);
server.use(usersRoutes);
server.use(handleErros);


export default server;
