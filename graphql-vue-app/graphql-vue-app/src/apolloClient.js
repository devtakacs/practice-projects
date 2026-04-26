import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4005/graphql',
    credentials: 'same-origin'
  }),
  cache: new InMemoryCache()
});