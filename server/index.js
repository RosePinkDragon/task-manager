require("dotenv").config();
const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const models = require("./models");
const app = express();
const port = 3001;

app.use(cors());
app.use(cookieParser());

const context = ({ req }) => {
  console.log(req);
  const token = req.headers.authorization || "";

  try {
    return ({ id, email } = jwt.verify(token.split(" ")[1], SECRET_KEY));
  } catch (e) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }
};

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
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

// db.sequelize.sync().then((req) => {
//   app.listen(PORT, () => {
//     console.log(`server up and running ${PORT}`);
//   });
// });
