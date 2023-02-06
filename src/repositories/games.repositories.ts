
import prisma from "../database/data";

export async function findGameByName(gameName: string) {
    
    const data = await prisma.game.findUnique({
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
}



async function createGame(game: string, type_id: number): Promise<void> {
    await prisma.game.create({
        data:{
            name: game,
            type_id:type_id
        }
    })
}

async function upsertUserGame(user_id: number, game_id: number, id?:number){
    await prisma.gameUser.upsert({
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
    const data = await prisma.gameUser.findFirst({
        where:{
            game_id:game_id,
            user_id:user_id
        }
    })
    return data
}

async function findGameUserByUserId(user_id: number){
    const data = await prisma.gameUser.findMany({
        where:{
            user_id: user_id
        },
        select:{
            id:true,
            users:true,
            games:{
                select:{
                    id:true,
                    name:true,
                    types:true
                }
            },
            completed:true
        }
    })
    return data
}


async function findAllGames(){
    const data = await prisma.game.findMany({
        select:{
            id: true,
            name:true,
            types:true
        }
    })
    
    return data
}

async function findGamesWithQuery(game: string){
    const data = await prisma.game.findMany({
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
   
}

async function findGameById(game_id: number) {
    const data = await prisma.gameUser.findUnique({
        where: {
            id:game_id
        }
    })
    return data
    
}

async function delGame(game_id: number): Promise<void> {
    await prisma.gameUser.delete({
        where: {
            id: game_id
        }
    })
    
}

const gamesRepository = {
    findGameByName,
    findAllGames,
    findGamesWithQuery,
    findGameById,
    findGameUser,
    findGameUserByUserId,
    createGame,
    upsertUserGame,
    delGame
}

export default gamesRepository