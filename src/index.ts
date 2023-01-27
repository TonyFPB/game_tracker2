import express from "express";
import { findGameByName } from "./repositories/games.repositories.js";
import gamesRoutes from "./routes/games.routes.js";
import usersRoutes from "./routes/users.routes.js";

const server = express()
server.use(express.json())
server.use(gamesRoutes)
server.use(usersRoutes)

server.get('/teste', async (req,res)=> {
    const teste = await findGameByName('pes')
    res.send(teste)
})
const port = process.env.PORT || 4000
server.listen(port, ()=>console.log(`Server is running on port:${port}`))