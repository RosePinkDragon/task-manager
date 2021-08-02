require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const models = require("./models");
const app = express();
const port = 3001;

const checkUser = (token) => {
  // let user;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        return (user = null);
      } else {
        return (user = decodedToken);
      }
    });
  }
  return user;
};

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
  server.applyMiddleware({ app });
  models.sequelize.sync();

  app.listen({ port }, async () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

startServer();
