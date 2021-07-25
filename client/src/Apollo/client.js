import { ApolloClient, createHttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import { cache } from "./cache";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

export const typeDefs = gql`
  extend type Query {
    Todos: [Todo]!
  }
`;

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("authToken");
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
  typeDefs,
});

export default client;
