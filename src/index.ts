import express from "express";
import gamesRoutes from "./routes/games.routes.js";

const server = express()
server.use(express.json())
server.use(gamesRoutes)


const port = process.env.PORT || 4000
server.listen(port, ()=>console.log(`Server is running on port:${port}`))