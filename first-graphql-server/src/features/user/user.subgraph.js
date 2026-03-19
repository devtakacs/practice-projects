const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { loadFileSync } = require('graphql-import-node');
const { ApolloServerPluginUsageReportingDisabled, ApolloServerPluginInlineTraceDisabled, ApolloServerPluginSchemaReportingDisabled } = require('@apollo/server/plugin/disabled');

const resolvers = require('./user.resolvers');
const typeDefs = loadFileSync(__dirname, '/user.graphql');

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    plugins: [
        ApolloServerPluginUsageReportingDisabled(),
        ApolloServerPluginInlineTraceDisabled(),
        ApolloServerPluginSchemaReportingDisabled(),
    ],
});

startStandaloneServer(server, {
    listen: { port: 4001 },
}).then(({ url }) => {
    console.log(`🚀 User subgraph ready at ${url}`);
});