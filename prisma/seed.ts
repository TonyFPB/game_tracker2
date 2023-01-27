import prisma from "../src/database/data.js"

async function main() {
    await prisma.users.create({
        data: {
            name: "joseph"
        }
    })

    await prisma.types.createMany({
        data: [{
            name: "esporte"
        },
        {
            name: "rpg"
        }
        ]
    })

    await prisma.games.createMany({
        data: [{
            name: "fifa",
            type_id: 1
        }, {
            name: "elden ring",
            type_id: 2
        }
        ]
    })
}

main( )
    .then( () => { console.log("registration was successful") })
    .catch( (e) => { 
           console.log( e )
           process.exit( 1 )      
     })
     .finally( async ( )=>{
           await prisma.$disconnect( )            
 })