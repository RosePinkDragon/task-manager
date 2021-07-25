import { InMemoryCache, Reference, makeVar, gql } from "@apollo/client";

// Initializes to true if localStorage includes a 'token' key,
// false otherwise

// Initializes to an empty array
export const TodosVar = makeVar([]);
export const CountVar = makeVar(0);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        Todos: {
          read() {
            return TodosVar();
          },
        },
        countPages: {
          read() {
            return CountVar();
          },
        },
      },
    },
  },
});
