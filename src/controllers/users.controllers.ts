import { Response, Request } from "express";
import { UserBody } from "../protocols/users.protocols";
import userServices from "../services/users.services";


export async function postUser(req: Request, res: Response): Promise<void> {
    const user = req.body as UserBody
    user.name = user.name.toLowerCase()

    await userServices.postNewUser(user.name)
    res.sendStatus(201)
}

export async function getUser(req: Request, res: Response) {
    const user = req.body as UserBody
    user.name = user.name.toLowerCase() 

    const userData = await userServices.findUser(user.name)
    res.send(userData)
}
