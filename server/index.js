require("dotenv").config();
const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const models = require("./models");
const app = express();
const port = 3001;
const jwt = require("jsonwebtoken");

const checkUser = (token) => {
  jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
    if (err) {
      return (user = null);
    } else {
      console.log(decodedToken);
      let user = await models.User.findBypk(decodedToken.id);
      const { id, email, name } = user;
      return { id, email, name };
    }
  });
};

const startServer = async () => {
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
