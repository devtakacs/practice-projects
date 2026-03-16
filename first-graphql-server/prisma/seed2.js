const dotenv = require('dotenv');
dotenv.config();

const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.user.deleteMany();

    const simpleUsers = Array.from({ length: 20 }, (_, i) => ({
        id: String(i + 1),
        email: `user${i + 1}@example.com`,
        gender: 'OTHER',
    }));

    await prisma.user.createMany({ data: simpleUsers });
    console.log('Seeded users:', simpleUsers.length);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
