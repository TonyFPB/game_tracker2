import { faker } from "@faker-js/faker"
import prisma from "../../src/database/data"
import { insertType } from "./types.factories"

export async function insertGame() {
    const type = await insertType()
    return await prisma.game.create({
        data: {
            name: faker.name.jobArea().toLowerCase(),
            type_id: type.id
        },
        select: {
            id: true,
            name: true,
            types: true
        }

    })
}

export async function insertGameUser(game_id: number, user_id: number, completed: boolean) {
    return await prisma.gameUser.create({
        data: {
            game_id,
            user_id,
            completed
        },
        select: {
            id: true,
            users: true,
            games: {
                select: {
                    id: true,
                    name: true,
                    types: true
                }
            },
            completed: true,

        }
    })
}



