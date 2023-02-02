import usersRepository from "../repositories/users.repositories";


async function postNewUser(nameUser: string): Promise<void> {
    const userExits = await usersRepository.findUserByName(nameUser)
    if (userExits) throw () => { return { name: "ConflictError" } }

    return await usersRepository.createUser(nameUser)
}

async function findUser(nameUser: string){
    const userExits = await usersRepository.findUserByName(nameUser)
    if (!userExits) throw () => { return { name: "NotFoundError" } }

    return userExits
}


const userServices = {
    postNewUser,
    findUser
}

export default userServices