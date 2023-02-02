import supertest from "supertest";
import server from "../src/index";

const api = supertest(server);

describe("To testando teste", () => {
  it("Deve retornar alguma coisa", async () => {
    const createBody = { name: "Joao" };
    const result = await api.post("/users").send(createBody);
    console.log(result.status)
  });
});
