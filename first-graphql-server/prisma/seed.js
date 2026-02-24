const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
require('dotenv').config();
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.user.createMany({
        data: [
            {
                id: "4",
                email: 'alice1@example.com',
                gender: 'FEMALE',
            },
            {
                id: "5",
                email: 'bob1@example.com',
                gender: 'MALE',
            },
            {
                id: "6",
                email: 'charlie1@example.com',
                gender: 'MALE'
            }
        ]
    });

    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
}

main().finally(() => prisma.$disconnect());