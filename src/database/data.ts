import pkg from "@prisma/client"

const { PrismaClient } = pkg
// const { Pool } = pg;


const prisma = new PrismaClient()

// const connection = new Pool({
//     host: "localhost",
//     port: 5432,
//     user: "postgres",
//     password: "root",
//     database: "game_tracker_db",
// })

export default prisma