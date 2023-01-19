import { type } from "os"

type GameEntity = {
    id: Number,
    name: string,
    type: Number,
    completed: boolean
}

type Game = {
    name: string,
    type: string
}

type GameInsertType = {
    name: string,
    type_id: number
}

export { Game, GameEntity, GameInsertType }