import { faker } from "@faker-js/faker";
import prisma from "../../src/database/data";
import supertest from "supertest";
import server from "../../src/index";
import { insertGame, insertGameUser } from "../factories/games.factories";
import { insertUser } from "../factories/users.factories";


const api = supertest(server);

beforeAll(async () => {
  await prisma.gameUser.deleteMany({})
  await prisma.game.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.type.deleteMany({})
})


beforeEach(async () => {
  await prisma.gameUser.deleteMany({})
  await prisma.game.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.type.deleteMany({})
})

describe("GET /games", () => {

  it("Should respond with status 404 when can't find any game", async () => {
    const result = await api.get("/games")
    expect(result.status).toEqual(404)
  });

  it("Should respond with status 404 when can't find any game with query", async () => {
    const result = await api.get("/games?game=fifa")
    expect(result.status).toEqual(404)
  });

  it("Should respond with status 200 when you can find the game ", async () => {
    const game = await insertGame()
    const result = await api.get("/games")

    expect(result.status).toEqual(200)
    expect(result.body).toEqual([{
      id: game.id,
      name: game.name,
      types: {
        id: game.types.id,
        name: game.types.name
      }
    }])
  });

  it("Should respond with status 200 when you can find the game with a query ", async () => {
    const game = await insertGame()

    const result = await api.get(`/games?game=${game.name}`)

    expect(result.status).toEqual(200)
    expect(result.body).toEqual([{
      id: game.id,
      name: game.name,
      types: {
        id: game.types.id,
        name: game.types.name
      }
    }])
  })
})

describe("GET /games/:user_id", () => {
  it("Should respond with status 404 when the user_id is not a number", async () => {
    const string = faker.datatype.string()

    const result = await api.get(`/games/${string}`)

    expect(result.status).toEqual(404)
  })

  it("Should respond with status 404 when user does not have any game", async () => {
    const user = await insertUser()

    const result = await api.get(`/games/${user.id}`)

    expect(result.status).toEqual(404)
  })

  it("Should respond with status 200 and the games from user", async () => {
    const user = await insertUser()
    const game = await insertGame()
    const completed = faker.datatype.boolean()
    const gameUser = await insertGameUser(game.id, user.id, completed)

    const result = await api.get(`/games/${user.id}`)


    expect(result.status).toEqual(200)
    expect(result.body).toEqual([{
      id: gameUser.id,
      users: {
        id: user.id,
        name: user.name
      },
      games: {
        id: game.id,
        name: game.name,
        types: {
          id: game.types.id,
          name: game.types.name
        }
      },
      completed: gameUser.completed
    }])
  })
})


describe("POST /games", () => {

  it("Should respond with status 422 when body is invalid", async () => {
    const invalidBody = { userName: faker.name.firstName(), game: faker.datatype.string() }

    const result = await api.post("/games").send(invalidBody)

    expect(result.status).toEqual(422)
  })

  it("Should respond with status 404 when user does not exists", async () => {
    const game = await insertGame()
    const validBody = { userName: "luis", game: game.name, type: game.types.name }

    const result = await api.post("/games").send(validBody)

    expect(result.status).toEqual(404)
  })

  it("Should respond with status 422 when the type does not belong to the game ", async () => {
    const game = await insertGame()
    const user = await insertUser()
    const validBody = { userName: user.name, game: game.name, type: 'rpg' }

    const result = await api.post("/games").send(validBody)

    expect(result.status).toEqual(422)
  })

  it("Should respond with status 409 when user already have the game", async () => {
    const game = await insertGame()
    const user = await insertUser()
    const gameUser = await insertGameUser(game.id, user.id, false)
    const body = { userName: user.name, game: game.name, type: game.types.name }

    const result = await api.post("/games").send(body)

    expect(result.status).toEqual(409)
  })

  it("Should respond with status 201 when you can create the game", async () => {
    const game = await insertGame()
    const user = await insertUser()

    const body = { userName: user.name, game: game.name, type: game.types.name }

    const result = await api.post("/games").send(body)

    expect(result.status).toEqual(201)
  })

})

describe("PUT /games/:user_id/:game_id", () => {
  it("Should respond with status 404 when the parametres are not numbers", async () => {
    const string = faker.datatype.string()

    const result = await api.put(`/games/${string}/${string}`)

    expect(result.status).toEqual(404)
  })

  it("Should respond with status 404 when can not find the game from user", async () => {
    const user = await insertUser()
    const game = await insertGame()

    const result = await api.put(`/games/${user.id}/${game.id}`)

    expect(result.status).toEqual(404)
  })

  it("Should respond with status 400 when user already finish the game", async () => {
    const user = await insertUser()
    const game = await insertGame()
    const gameUser = await insertGameUser(game.id, user.id, true)
    const result = await api.put(`/games/${user.id}/${game.id}`)

    expect(result.status).toEqual(400)
  })

  it("Should respond with status 200 when can complete the game", async () => {
    const user = await insertUser()
    const game = await insertGame()
    const gameUser = await insertGameUser(game.id, user.id, false)
    const result = await api.put(`/games/${user.id}/${game.id}`)

    expect(result.status).toEqual(200)
  })
})


describe("DELETE /games/:user_id/:game_id", () => {
  it("Should respond with status 404 when the parametres are not numbers", async () => {
    const string = faker.datatype.string()

    const result = await api.delete(`/games/${string}/${string}`)

    expect(result.status).toEqual(404)
  })

  it("Should respond with status 404 when can not find the game from user", async () => {
    const user = await insertUser()
    const game = await insertGame()

    const result = await api.delete(`/games/${user.id}/${game.id}`)

    expect(result.status).toEqual(404)
  })

  it("Should respond with status 400 when user does not finished the game", async () => {
    const user = await insertUser()
    const game = await insertGame()
    const gameUser = await insertGameUser(game.id, user.id, false)

    const result = await api.delete(`/games/${user.id}/${game.id}`)

    expect(result.status).toEqual(400)
  })

  it("Should respond with status 200 when can complete the game", async () => {
    const user = await insertUser()
    const game = await insertGame()
    const gameUser = await insertGameUser(game.id, user.id, true)

    const result = await api.delete(`/games/${user.id}/${game.id}`)

    expect(result.status).toEqual(200)
  })
})
