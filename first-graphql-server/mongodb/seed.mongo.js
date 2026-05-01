const UserModel = require('./user.model');

async function main() {
    await UserModel.insertMany([
        { email: 'demo@example.com', gender: 'MALE' },
        { email: 'another@example.com', gender: 'FEMALE' },
    ]);

    console.log('Seed data inserted');
    await UserModel.db.close();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});