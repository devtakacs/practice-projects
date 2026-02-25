const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
require('dotenv').config();
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    // `createMany` will throw if any unique constraint is violated, which
    // happens on repeated deploys.  `skipDuplicates: true` tells Prisma to
    // ignore entries that already exist.  We still keep a try/catch around the
    // call just in case the adapter doesn't support the flag or another error
    // occurs.
    try {
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
            ],
            skipDuplicates: true, // ignore already‑present emails
        });
    } catch (e) {
        console.warn('seed warning:', e.message || e);
    }

    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
}

main().finally(() => prisma.$disconnect());