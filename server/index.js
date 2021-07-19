const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const models = require("./models");

const app = express();
const port = 3001;

app.use(cors());

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  models.sequelize.sync();

  app.listen({ port }, async () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
  // const todos = await models.Todo.findByPk(1);
  // const todos = await models.Todo.destroy({ where: { id: 1 } });
  // console.log(todos);
};

startServer();

// db.sequelize.sync().then((req) => {
//   app.listen(PORT, () => {
//     console.log(`server up and running ${PORT}`);
//   });
// });
