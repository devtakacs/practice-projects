const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const schema = require('./schema/local.schema');

async function startServer() {
    const app = express();
    app.use(cors());
    
    const apolloServer = new ApolloServer({schema});
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

    httpServer.listen(4000, () => {
        console.log(`Server is running at http://localhost:4000${apolloServer.graphqlPath}`);
        console.log(`Subscriptions are running at ws://localhost:4000${apolloServer.graphqlPath}`);
    });
}

startServer();