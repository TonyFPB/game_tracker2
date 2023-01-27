import { Router } from "express";
import { postUser, getUser } from "../controllers/users.controllers.js";
import { validationSchema } from "../middlewares/validateSchemas.js";
import userSchema from "../schemas/users.schema.js";

const usersRoutes = Router()

usersRoutes.post('/users',validationSchema(userSchema), postUser)
usersRoutes.get("/users",validationSchema(userSchema), getUser)


export default usersRoutes