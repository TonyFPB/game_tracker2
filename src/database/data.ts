import pg from "pg"

const { Pool } = pg;

const connection = new Pool({
    host:"localhost",
    port:5432,
    user:"postgres",
    password:"root",
    database:"game_tracker_db",
})

export default connection