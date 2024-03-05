const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.location.createMany({
            data: [
                {name: "Lagos state"},
                {name: "Rivers state"},
                {name: "FCT"},
                {name: "Osun state"},
                {name: "Ogun state"},
                {name: "Imo state"},
                {name: "Kano state"},
            ]
        });

        console.log("success");

    } catch (error) {
        console.log("Error seeding the database locations", error);
    } finally {
        await database.$disconnect();
    }
}

main();