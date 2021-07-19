import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

// const authLink = setContext((_, { headers }) => {
//   const token = "YOUR_TOKEN_HERE";
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
