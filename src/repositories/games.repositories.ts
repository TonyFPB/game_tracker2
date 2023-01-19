import { QueryResult } from "pg";
import connection from "../database/data.js";
import { GameEntity, GamesAll } from "../protocols/game.protocols.js";

export async function findGameByName(gameName: String): Promise<QueryResult<GameEntity>> {
    return connection.query("SELECT * FROM games WHERE name=$1", [gameName])
}

export async function insertGame(name: String, type_id: Number) {
    return connection.query('INSERT INTO games (name,type_id) VALUES ($1,$2)', [name, type_id])
}

export async function findAllGames(): Promise<QueryResult<GamesAll>> {
    return connection.query("SELECT g.id,INITCAP(g.name) AS name,g.completed,g.type_id, t.name AS type FROM games g JOIN types t ON g.type_id=t.id ORDER BY g.id;")
}

export async function findGamesWithQuery(game: String): Promise<QueryResult<GamesAll>> {
    return connection.query("SELECT g.id,INITCAP(g.name) AS name,g.completed,g.type_id, t.name AS type FROM games g JOIN types t ON g.type_id=t.id WHERE g.name LIKE $1 ORDER BY g.id;", [`${game}%`])
}

export async function findGameById(game_id: Number): Promise<QueryResult<GameEntity>> {
    return connection.query('SELECT * FROM games WHERE id=$1', [game_id])
}

export async function updateGame(game_id: Number) {
    return connection.query(`UPDATE games SET completed=true WHERE id=$1`, [game_id])
}

export async function delGame(game_id: Number) {
    return connection.query("DELETE FROM games WHERE id=$1",[game_id])
}
