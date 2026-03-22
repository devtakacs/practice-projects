const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { parse } = require('graphql');
const fs = require('fs');
const path = require('path');
const { ApolloServerPluginUsageReportingDisabled, ApolloServerPluginInlineTraceDisabled, ApolloServerPluginSchemaReportingDisabled } = require('@apollo/server/plugin/disabled');

const resolvers = require('./address.resolver');
const typeDefsSDL = fs.readFileSync(path.join(__dirname, 'address.graphql'), 'utf8');
const typeDefs = parse(typeDefsSDL);

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    plugins: [
        ApolloServerPluginUsageReportingDisabled(),
        ApolloServerPluginInlineTraceDisabled(),
        ApolloServerPluginSchemaReportingDisabled(),
    ],
});

startStandaloneServer(server, {
    listen: { port: 4002 },
}).then(({ url }) => {
    console.log(`🚀 Address subgraph ready at ${url}`);
});