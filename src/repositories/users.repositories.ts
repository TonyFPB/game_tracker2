import prisma  from "../database/data.js";
import { UserEntity } from "../protocols/users.protocols.js";


async function findUserByName(name: string): Promise<UserEntity>{
    const data = await prisma.users.findUnique({
        where:{
            name: name
        }
    })
    return data
}

async function createUser(name: string){
    await prisma.users.create({
        data:{
            name: name
        }
    })
}

const usersRepository = {
    findUserByName,
    createUser
}

export default usersRepository