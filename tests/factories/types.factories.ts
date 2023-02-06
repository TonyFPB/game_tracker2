import prisma from '../../src/database/data'
import {faker} from "@faker-js/faker"

export async function insertType() {
    return await prisma.type.create({
        data: { name: faker.name.jobArea().toLowerCase() }
    })
}