import { NewGame } from "../protocols/game.protocols";
import gamesRepository from "../repositories/games.repositories";
import typeRepository from "../repositories/types.repositories";
import usersRepository from "../repositories/users.repositories";



async function postNewGame(body: NewGame) {
  const userExits = await usersRepository.findUserByName(body.userName);

  if (!userExits) {
    throw { name: "NotFoundError", message: "User not found" }
  }

  const gamesExists = await gamesRepository.findGameByName(body.game);
  const typeExists = await typeRepository.findTypeByName(body.type);

  if (
    (gamesExists && !typeExists) ||
    (gamesExists && typeExists && gamesExists.types.id !== typeExists.id)
  ) {
    throw {
      name: "Unprocessable",
      message: "Type does't match the type of the game ",
    };
  }

  if (!gamesExists && !typeExists) {
    await typeRepository.createType(body.type);
    const type = await typeRepository.findTypeByName(body.type);

    await gamesRepository.createGame(body.game, type.id);
    const game = await gamesRepository.findGameByName(body.game);

    await gamesRepository.upsertUserGame(userExits.id, game.id);
    return;
  }
  if (!gamesExists && typeExists) {
    await gamesRepository.createGame(body.game, typeExists.id);
    const game = await gamesRepository.findGameByName(body.game);

    await gamesRepository.upsertUserGame(userExits.id, game.id);
    return;
  }

  const userGameExists = await gamesRepository.findGameUser(
    userExits.id,
    gamesExists.id
  );

  if (userGameExists) {
    throw {
      name: "ConflictError",
      message: "The game already exists for the user",
    };
  }

  await gamesRepository.upsertUserGame(userExits.id, gamesExists.id);
  return;
}

async function getGames(game?: string) {
  if (game) {
    const games = await gamesRepository.findGamesWithQuery(game);
    if (games.length === 0) throw { name: "NotFoundError" };

    return games;
  }
  if (!game) {
    const games = await gamesRepository.findAllGames();
    if (games.length === 0) throw { name: "NotFoundError" };

    return games;
  }
}

async function updateGame(user_id: string, game_id: string) {
  if (isNaN(Number(user_id)) || isNaN(Number(game_id))) {
    throw { name: "NotFoundError", message: "User or game not found" };
  }

  const gameUser = await gamesRepository.findGameUser(
    Number(user_id),
    Number(game_id)
  );
  if (!gameUser) {
    throw {
      name: "NotFoundError",
      message: "User does not have the game yet or user not found",
    };
  }

  if (gameUser.completed) {
    throw { name: "BadRequest", message: "The game is already finished." };
  }

  await gamesRepository.upsertUserGame(
    Number(user_id),
    Number(game_id),
    gameUser.id
  );
}

async function deleteGame(user_id: string, game_id: string) {
  if (isNaN(Number(user_id)) || isNaN(Number(game_id))) {
    throw { name: "NotFoundError", message: "User or game not found" };
  }

  const gameUser = await gamesRepository.findGameUser(
    Number(user_id),
    Number(game_id)
  );
  if (!gameUser) {
    throw {
      name: "NotFoundError",
      message: "User does not have the game yet or user not found",
    };
  }

  if (!gameUser.completed) {
    throw {
      name: "BadRequest",
      message: "The game is not finished. Please complete the game.",
    };
  }

  await gamesRepository.delGame(gameUser.id);
}

async function getGameUser(user_id: string) {
  if (isNaN(Number(user_id)))
    throw () => {
      return { name: "NotFoundError", message: "User not found" };
    };

  const user = await gamesRepository.findGameUserByUserId(Number(user_id));
  if (!user)
    throw () => {
      return {
        name: "NotFoundError",
        message: "User does not have the game yet",
      };
    };

  return user;
}

const gamesServices = {
  postNewGame,
  getGames,
  getGameUser,
  updateGame,
  deleteGame,
};

export default gamesServices;
