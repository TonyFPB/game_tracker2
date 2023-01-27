

type GameEntity = {
    id: number,
    name: string,
    type_id: number,
    completed?: boolean
}

type NewGame = {
    userName: string,
    game: string,
    type: string
}

type GameInsertType = {
    name: string,
    type_id: number
}

type GamesAll = {
    id: number,
    name: string,
    completed: boolean,
    type_id: number,
    type: string
}

export { NewGame, GameEntity, GameInsertType, GamesAll }