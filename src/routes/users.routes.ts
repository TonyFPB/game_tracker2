import { Router } from "express";
import { postUser } from "../controllers/users.controllers.js";
import { validationSchema } from "../middlewares/validateSchemas.js";
import userSchema from "../schemas/users.schema.js";

const usersRoutes = Router()

usersRoutes.post('/users',validationSchema(userSchema), postUser)

export default usersRoutes