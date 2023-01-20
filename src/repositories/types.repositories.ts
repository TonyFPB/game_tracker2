import { QueryResult } from "pg"
import connection from "../database/data.js"
import { TypeEntity } from "../protocols/type.protocols.js"

export async function findTypeByName(typeName: String): Promise<QueryResult<TypeEntity>> {
    return connection.query('SELECT * FROM types WHERE name=$1', [typeName])
}

export async function createType(tyepeName: String):Promise<void> {
    await connection.query('INSERT INTO types (name) VALUES ($1)', [tyepeName])
}