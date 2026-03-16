require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const ratelimit = require('express-rate-limit');

const schema = require('./schema/local.schema');
const { getUserFromToken } = require('./shared/auth');

const { PORT } = require('./config');

const limiter = ratelimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 5, // limit each IP to 5 requests per windowMs
    keyGenerator: (req) => req.headers['x-user-id'] || req.ip, // use user ID from header or fallback to IP
});

async function startServer() {
    const app = express();
    app.use(limiter);
    
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            const user = getUserFromToken(token.replace('Bearer ', ''));
            return { user };
        },
        // make sure introspection (and the Playground) are available even
        // in production environments.  Apollo Server automatically disables
        // them when NODE_ENV==='production', which is likely why Apollo
        // Studio complained.
        introspection: true,
        playground: true,
        plugins: [
            {
                async requestDidStart() {
                    return {
                        async executionDidStart() {
                            return {
                                willResolveField({ info }) {
                                    const fieldName = info.fieldName;
                                    const start = Date.now();
                                    return () => {
                                        const duration = Date.now() - start;
                                        console.log(`Field ${fieldName} resolved in ${duration}ms`);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]
    });
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    const httpServer = createServer(app);
    SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
        },
        {
            server: httpServer,
            path: apolloServer.graphqlPath,
        }
    );

    httpServer.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}${apolloServer.graphqlPath}`);
        console.log(`Subscriptions are running at ws://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
}

startServer();