import { QueryResult } from "pg";
import connection from "../database/data.js";
import { GameEntity } from "../protocols/game.protocols.js";

export async function findGameByName(gameName: string): Promise<QueryResult<GameEntity>> {
    return connection.query("SELECT * FROM games WHERE name=$1", [gameName])
}

export async function insertGame(name: string, type_id: number) {
    return connection.query('INSERT INTO games (name,type_id) VALUES ($1,$2)', [name, type_id])
}

