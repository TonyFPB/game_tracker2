import usersRepository from "../repositories/users.repositories.js";


async function postNewUser(nameUser: string): Promise<void> {
    const userExits = await usersRepository.findUserByName(nameUser)
    if (userExits) throw () => { return { name: "ConflictError" } }

    return await usersRepository.createUser(nameUser)
}


const userServices = {
    postNewUser
}

export default userServices