import { NewGame } from "../protocols/game.protocols.js";
import gamesRepository from "../repositories/games.repositories.js";
import typeRepository from "../repositories/types.repositories.js";
import usersRepository from "../repositories/users.repositories.js";

async function postNewGame(body: NewGame) {
    const userExits = await usersRepository.findUserByName(body.userName)

    if (!userExits) throw () => { return { name: "UserNotFound" } }

    const gamesExists = await gamesRepository.findGameByName(body.game)
    const typeExists = await typeRepository.findTypeByName(body.type)

    if ((gamesExists && !typeExists) || ((gamesExists && typeExists) && gamesExists.types.id !== typeExists.id)) throw () => { return { name: "Unprocessable" } }

    if (!gamesExists && !typeExists) {
        await typeRepository.createType(body.type)
        const type = await typeRepository.findTypeByName(body.type)

        await gamesRepository.createGame(body.game, type.id)
        const game = await gamesRepository.findGameByName(body.game)

        await gamesRepository.upsertUserGame(userExits.id, game.id)
        return;
    }
    if (!gamesExists && typeExists) {
        await gamesRepository.createGame(body.game, typeExists.id)
        const game = await gamesRepository.findGameByName(body.game)

        await gamesRepository.upsertUserGame(userExits.id, game.id)
        return;
    }

    const userGameExists = gamesRepository.findGameUser(userExits.id, gamesExists.id)
    if (userGameExists) throw () => { return { name: "ConflictError" } }

    await gamesRepository.upsertUserGame(userExits.id, gamesExists.id)
    return;
}

async function getGames(game?: string) {
    if (game) {
        const games = await gamesRepository.findGamesWithQuery(game)
        if (games.length === 0) {

            throw () => { return { name: "NotFoundError" } }
        }
        return games
    }
    if (!game) {
        const games = await gamesRepository.findAllGames()

        if (games.length === 0) {
            throw () => { return { name: "NotFoundError" } }
        }
        return games
    }
}

async function updateGame(user_id: string, game_id: string) {
    if (isNaN(Number(user_id)) || isNaN(Number(game_id))) throw () => { return { name: "NotFoundError", message: "User or game not found" } }

    const gameUser = await gamesRepository.findGameUser(Number(user_id), Number(game_id))
    if (!gameUser) throw () => { return { name: "NotFoundError", message: "User does not have the game yet" } }

    if(gameUser.completed) throw () => { return { name: "BadRequest", message: "The game is already finished." } }

    await gamesRepository.upsertUserGame(Number(user_id), Number(game_id), gameUser.id)

}

const gamesServices = {
    postNewGame,
    getGames,
    updateGame
}

export default gamesServices