import { rename } from "fs";
import { QueryResult } from "pg";
import prisma from "../database/data.js";
import { GameEntity, GamesAll } from "../protocols/game.protocols.js";

export async function findGameByName(gameName: string) {
    const data = await prisma.games.findUnique({
        where: {
            name: gameName
        },
        select: {
            id:true,
            name:true,
            types:true
        },
    })
    return data
    // return connection.query("SELECT * FROM games WHERE name=$1", [gameName])
}

export async function createGame(game: string, type_id: number): Promise<void> {
    await prisma.games.create({
        data:{
            name: game,
            type_id:type_id
        }
    })
    // await connection.query('INSERT INTO games (name,type_id) VALUES ($1,$2)', [name, type_id])
}

async function upsertUserGame(user_id: number, game_id: number, id?:number){
    await prisma.games_users.upsert({
        where:{
            id: id || 0
        },
        update:{
            completed: true
        },
        create:{
            user_id: user_id,
            game_id: game_id
        }
    })
}

async function findGameUser(user_id: number, game_id: number){
    const data = await prisma.games_users.findFirst({
        where:{
            game_id:game_id,
            user_id:user_id
        }
    })
    return data
}

export async function findAllGames(){
    const data = await prisma.games.findMany({
        select:{
            id: true,
            name:true,
            types:true
        }
    })
    
    return data
    // return connection.query("SELECT g.id,INITCAP(g.name) AS name,g.completed,g.type_id, t.name AS type FROM games g JOIN types t ON g.type_id=t.id ORDER BY g.id;")
}

export async function findGamesWithQuery(game: string){
    const data = await prisma.games.findMany({
        where:{
            name:{
                startsWith:game,
            }
        },
        select:{
            id: true,
            name:true,
            types:true
        },
    })
    return data
    //     return connection.query("SELECT g.id,INITCAP(g.name) AS name,g.completed,g.type_id, t.name AS type FROM games g JOIN types t ON g.type_id=t.id WHERE g.name LIKE $1 ORDER BY g.id;", [`${game}%`])
}

export async function findGameById(game_id: number) {
    const data = await prisma.games_users.findUnique({
        where: {
            id:game_id
        }
    })
    return data
    // return connection.query('SELECT * FROM games WHERE id=$1', [game_id])
}

export async function delGame(game_id: number): Promise<void> {
    await prisma.games_users.delete({
        where: {
            id: game_id
        }
    })
    // await connection.query("DELETE FROM games WHERE id=$1", [game_id])
}

const gamesRepository = {
    findGameByName,
    findAllGames,
    findGamesWithQuery,
    findGameById,
    findGameUser,
    createGame,
    upsertUserGame,
    delGame
}

export default gamesRepository