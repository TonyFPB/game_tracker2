
import prisma from "../database/data.js"
import { TypeEntity } from "../protocols/type.protocols.js"

export async function findTypeByName(typeName: string): Promise<TypeEntity> {
    const data = await prisma.types.findFirst({
        where:{
            name: typeName
        }
    })
    return data
}

export async function createType(tyepeName: string):Promise<void> {
    await prisma.types.create({
        data:{
            name: tyepeName
        }
    })
}

const typeRepository = {
    findTypeByName,
    createType
}
export default typeRepository