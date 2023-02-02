import { Router } from "express";
import { postUser, getUser } from "../controllers/users.controllers";
import { validationSchema } from "../middlewares/validateSchemas";
import userSchema from "../schemas/users.schema";

const usersRoutes = Router()

usersRoutes.post('/users',validationSchema(userSchema), postUser)
usersRoutes.get("/users",validationSchema(userSchema), getUser)


export default usersRoutes