
import prisma from "../database/data.js"
import { TypeEntity } from "../protocols/type.protocols.js"

export async function findTypeByName(typeName: string): Promise<TypeEntity> {
    const data = await prisma.types.findFirst({
        where:{
            name: typeName
        }
    })
    return data
    // return connection.query('SELECT * FROM types WHERE name=$1', [typeName])
}

export async function createType(tyepeName: string):Promise<void> {
    await prisma.types.create({
        data:{
            name: tyepeName
        }
    })
    // await connection.query('INSERT INTO types (name) VALUES ($1)', [tyepeName])
}

const typeRepository = {
    findTypeByName,
    createType
}
export default typeRepository