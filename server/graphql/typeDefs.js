const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum Status {
    Completed
    Ongoing
    Created
  }

  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
  }

  type Todo {
    id: Int!
    taskTitle: String!
    createdBy: String!
    assignedTo: String!
    status: Status!
    createdAt: Float!
    updatedAt: Float!
  }

  type Delete {
    status: String!
  }

  type Query {
    getTodo: [Todo!]!
    getSingleTodo(id: Int!): [Todo!]!
    getUsers: [User!]!
    loginUser(email: String!, password: String!): User!
  }

  type Mutation {
    createTodo(
      taskTitle: String!
      createdBy: String!
      assignedTo: String!
      status: String!
    ): Todo!

    createUser(name: String!, email: String!, password: String!): User!
    deleteTodo(id: Int!): Delete!
  }
`;
module.exports = typeDefs;
