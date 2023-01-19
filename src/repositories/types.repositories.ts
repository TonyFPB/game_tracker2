import { QueryResult } from "pg"
import connection from "../database/data.js"
import { TypeEntity } from "../protocols/type.protocols.js"

export async function findTypeByName(typeName: string): Promise<QueryResult<TypeEntity>> {
    return connection.query('SELECT * FROM types WHERE name=$1', [typeName])
}

export async function createType(tyepeName: string) {
    return connection.query('INSERT INTO types (name) VALUES ($1)', [tyepeName])
}