require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const models = require("./models");
const checkUser = require("./utils/checkUser");
const { graphqlUploadExpress } = require("graphql-upload");
const app = express();
const port = 3001;

// TODO require when mocking
// const mocks = require("./utils/mocks");

const startServer = async () => {
  // ?? to mock a server just add in mocks:true as an option to the server.
  // ?? it returns a fixed feilds depending on type

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      const user = checkUser(token);
      return { user };
    },
  });

  await server.start();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });
  models.sequelize.sync();

  app.listen({ port }, async () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

startServer();
