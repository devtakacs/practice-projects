const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { stitchSchemas } = require('@graphql-tools/stitch');
const localSchema = require('./local.schema');
const createRemoteSchema = require('./remote.schema');

async function startGateway() {
    const remoteSchema = await createRemoteSchema();

    const gatewaySchema = stitchSchemas({
        subschemas: [
            { schema: localSchema },
            { schema: remoteSchema },
        ],
    });

    const server = new ApolloServer({ schema: gatewaySchema });

    startStandaloneServer(server, {
        listen: { port: 4000 },
    }).then(({ url }) => {
        console.log(`Server ready at: ${url}`);
    });
}

startGateway().catch(error => {
    console.error('Error starting gateway:', error);
    process.exit(1);
});