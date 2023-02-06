import prisma from "../../src/database/data"
import {faker} from "@faker-js/faker"
export async function insertUser (){
    return await prisma.user.create({
        data:{
            name:faker.name.firstName().toLowerCase()
        }
    })
}

