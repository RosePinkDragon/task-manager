const { graphql } = require("graphql");
const { makeExecutableSchema } = require("graphql-tools");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const schema = makeExecutableSchema({ typeDefs, resolvers });

const graphqlTestCall = async (query, variables, userId) => {
  return graphql(
    schema,
    query,
    undefined,
    {
      req: {
        session: {
          userId,
        },
      },
      res: {
        clearCookie: () => {},
      },
    },
    variables
  );
};

module.exports = graphqlTestCall;
