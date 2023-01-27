import { Response, Request } from "express";
import { UserBody } from "../protocols/users.protocols.js";
import userServices from "../services/users.services.js";


export async function postUser(req: Request, res: Response): Promise<void> {
    const user = req.body as UserBody
    try {
        await userServices.postNewUser(user.name)
        res.sendStatus(201)
    } catch (err) {
        const e = err()
        if (e.name === "ConflictError") {
            res.sendStatus(409)
            return
        }
        res.sendStatus(500)
    }
}

export async function getUser(req: Request, res: Response) {
    const user = req.body as UserBody
    user.name = user.name.toLowerCase()
    try {
        
        const userData = await userServices.findUser(user.name)
        res.send(userData)
    } catch (err) {
        const e = err()
        if (e.name === "NotFoundError") {
            res.sendStatus(404)
            return
        }
        res.sendStatus(500)
    }

}