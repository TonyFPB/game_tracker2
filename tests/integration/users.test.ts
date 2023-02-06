import { faker } from "@faker-js/faker";
import prisma from "database/data";
import supertest from "supertest";
import server from "../../src/index";
import { insertUser } from "../factories/users.factories";


const api = supertest(server);

beforeAll(async () => {
    await prisma.user.deleteMany({})
})

afterEach(async () => {
    await prisma.user.deleteMany({})
})

describe("POST /users", () => {
    it("Should respond with status 422 when invalid body", async () => {
        const invalidBody = { name: "" }

        const result = await api.post("/users").send(invalidBody)

        expect(result.status).toEqual(422)
    })

    it("Should respond with status 409 when user already exists", async () => {
        const user = await insertUser()
        const body = { name: user.name }

        const result = await api.post("/users").send(body)

        expect(result.status).toEqual(409)
    })

    it("Should respond with status 201 when user is created", async () => {
        const body = { name: faker.name.firstName() }

        const result = await api.post("/users").send(body)

        expect(result.status).toEqual(201)
    })
})

describe("GET /users", () => {
    it("Should respond with status 422 when invalid body", async () => {
        const invalidBody = { name: "" }

        const result = await api.get("/users").send(invalidBody)

        expect(result.status).toEqual(422)
    })

    it("Should respond with status 404 when user does not exists", async () => {
        const fakeUserName = faker.name.firstName()
        const body = { name: fakeUserName }

        const result = await api.get("/users").send(body)

        expect(result.status).toEqual(404)
    })

    it("Should respond with status 200 when user is created", async () => {
        const user = await insertUser()
        const body = { name: user.name }

        const result = await api.get("/users").send(body)

        expect(result.status).toEqual(200)
        expect(result.body).toEqual({
            id: user.id,
            name: user.name
        })
    })
})