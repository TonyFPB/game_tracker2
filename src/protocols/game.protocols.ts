import { type } from "os"

type GameEntity = {
    id: Number,
    name: String,
    type: Number,
    completed: Boolean
}

type Game = {
    name: String,
    type: String
}

type GameInsertType = {
    name: String,
    type_id: Number
}

type GamesAll = {
    id: Number,
    name: String,
    completed: Boolean,
    type_id: Number,
    type: String
}

export { Game, GameEntity, GameInsertType, GamesAll }