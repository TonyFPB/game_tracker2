import { Request, Response } from "express";
import { NewGame } from "../protocols/game.protocols";
import gamesServices from "../services/games.services";

export async function getGame(req: Request, res: Response): Promise<void> {
  const game = req.query.game as string;

  const games = await gamesServices.getGames(game);
  res.send(games);
}

export async function getAllGamesUser(req: Request, res: Response) {
  const user_id: string = req.params.user_id;

  const userData = await gamesServices.getGameUser(user_id);
  res.send(userData);
}

export async function postGame(req: Request, res: Response): Promise<void> {
  const newUserGame = req.body as NewGame;
  newUserGame.userName = newUserGame.userName.toLowerCase();
  newUserGame.game = newUserGame.game.toLowerCase();
  newUserGame.type = newUserGame.type.toLowerCase();

  await gamesServices.postNewGame(newUserGame);
  res.sendStatus(201);
}

export async function putGame(req: Request, res: Response): Promise<void> {
  const user_id: string = req.params.user_id;
  const game_id: string = req.params.game_id;

  await gamesServices.updateGame(user_id, game_id);
  res.sendStatus(200);
}

export async function deleteGame(req: Request, res: Response): Promise<void> {
  const user_id: string = req.params.user_id;
  const game_id: string = req.params.game_id;

  await gamesServices.deleteGame(user_id, game_id);
  res.sendStatus(200);
}
