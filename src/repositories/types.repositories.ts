
import prisma from "../database/data"
import { TypeEntity } from "../protocols/type.protocols"

export async function findTypeByName(typeName: string): Promise<TypeEntity> {
    const data = await prisma.type.findFirst({
        where:{
            name: typeName
        }
    })
    return data
}

export async function createType(tyepeName: string):Promise<void> {
    await prisma.type.create({
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