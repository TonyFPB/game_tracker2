import { QueryResult } from "pg";
import connection from "../database/data.js";
import { GameEntity, GamesAll } from "../protocols/game.protocols.js";

export async function findGameByName(gameName: string): Promise<QueryResult<GameEntity>> {
    return connection.query("SELECT * FROM games WHERE name=$1", [gameName])
}

export async function insertGame(name: string, type_id: number) {
    return connection.query('INSERT INTO games (name,type_id) VALUES ($1,$2)', [name, type_id])
}

export async function findAllGames(): Promise<QueryResult<GamesAll>> {
    return connection.query("SELECT g.id,INITCAP(g.name) AS name,g.completed,g.type_id, t.name AS type FROM games g JOIN types t ON g.type_id=t.id ORDER BY g.id;")
}

export async function findGamesWithQuery(game:string): Promise<QueryResult<GamesAll>> {
    return connection.query("SELECT g.id,INITCAP(g.name) AS name,g.completed,g.type_id, t.name AS type FROM games g JOIN types t ON g.type_id=t.id WHERE g.name LIKE $1 ORDER BY g.id;",[`${game}%`])
}
