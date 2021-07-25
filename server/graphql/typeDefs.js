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
  }

  type filteredTodos {
    count: Int!
    todo: [Todo!]!
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

  type Login {
    token: String!
    user: User!
  }

  type Update {
    success: Boolean!
    todo: Todo
  }

  type Query {
    getTodo(filterTitle: String!, sortBy: String!): filteredTodos!

    getSingleTodo(id: Int!): [Todo!]!
    getUsers: [User!]!
    loginUser(email: String!, password: String!): Login!
    loginGoogle(email: String!, name: String!): Login!
  }

  type Mutation {
    createTodo(
      taskTitle: String!
      createdBy: String!
      assignedTo: String!
      status: String!
    ): Todo!
    updateTodo(id: Int!, status: String!): Update!
    deleteTodo(id: Int!): Delete!
    createUser(name: String!, email: String!, password: String!): User!
  }
`;
module.exports = typeDefs;
