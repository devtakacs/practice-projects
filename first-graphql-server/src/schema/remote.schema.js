const { loadSchema } = require('@graphql-tools/load');
const { UrlLoader } = require('@graphql-tools/url-loader');
const fetch = require('node-fetch');

async function createRemoteSchema() {
    const schema = await loadSchema('https://countries.trevorblades.com/', {
        loaders: [ new UrlLoader() ],
        fetch,
    });
    return schema;
}

module.exports = createRemoteSchema;
