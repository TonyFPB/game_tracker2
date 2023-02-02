import prisma  from "../database/data";
import { UserEntity } from "../protocols/users.protocols";


async function findUserByName(name: string): Promise<UserEntity>{
    const data = await prisma.user.findUnique({
        where:{
            name: name
        }
    })
    return data
}

async function createUser(name: string){
    await prisma.user.create({
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