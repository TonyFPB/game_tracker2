import { Response, Request } from "express";
import { UserBody } from "../protocols/users.protocols.js";
import userServices from "../services/users.services.js";


export async function postUser(req: Request, res: Response): Promise<void>{
    const body = req.body as UserBody
    try{
        await userServices.postNewUser(body.name)
        res.sendStatus(201)
    }catch(e){
        const err = e()
        if(err.name === "ConflictError"){
            res.sendStatus(409)
            return 
        }
        res.sendStatus(500)
    }
}