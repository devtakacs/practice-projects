const { GraphQLError } = require('graphql');
const pubsub = require('../../shared/pubsub');

// Data
const users = [
    { id: '1', email: 'demo@example.com', gender: 'MALE' },
    { id: '2', email: 'another@example.com', gender: 'FEMALE' },
];

// Resolvers
const resolvers = {
    Query: {
        user: () => users[0],
        users: () => users,
    },
    Mutation: {
        createUser: (parent, { input }) => {

            // Basic validation
            if (!input.email) {
                throw new GraphQLError("Email is required", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: ["email"],
                    }
                });
            }

            // Sabitization steps
            email = input.email.trim().toLowerCase();
            // password = input.password.trim();
            gender = input.gender?.toUpperCase();

            // if (input.password.length < 8) {
            //     throw new GraphQLError("Password must be at least 8 characters long", {
            //         extensions: {
            //             code: "BAD_USER_INPUT",
            //             invalidArgs: ["password"],
            //         }
            //     });
            // }

            const newUser = { id: String(users.length + 1), email: input.email, gender: input.gender };
            users.push(newUser);

            pubsub.publish('USER_CREATED', { userCreated: newUser });

            return newUser;
        },
        updateUser: (parent, { input }) => {
            const userIndex = users.findIndex(user => user.id === input.id);
            if (userIndex === -1) {
                throw new Error("User not found");
            }
            users[userIndex].email = input.email;
            return users[userIndex];
        },
        deleteUser: (parent, { id }) => {
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex === -1) {
                return false;
            }
            users.splice(userIndex, 1);
            return true;
        }
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubsub.asyncIterableIterator('USER_CREATED'),
        },
    },
};

module.exports = resolvers;