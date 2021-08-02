const { gql } = require("apollo-server-express");

const todoDefs = gql`
  type Todo {
    id: Int!
    taskTitle: String!
    createdBy: String!
    assignedTo: String!
    status: Status!
    createdAt: Float!
    updatedAt: Float!
  }

  enum Status {
    Completed
    Ongoing
    Created
  }

  type filteredTodos {
    count: Int!
    todo: [Todo!]!
  }

  type Delete {
    status: String!
  }

  type Update {
    success: Boolean!
    todo: Todo
  }

  extend type Query {
    getTodo(
      filterTitle: String!
      sortBy: String!
      order: String
      limit: Int
      offset: Int
      currentStatus: String
      createdBy: String
      assignedTo: String
    ): filteredTodos!
    getSingleTodo(id: Int!): [Todo!]!
  }

  extend type Mutation {
    createTodo(
      taskTitle: String!
      createdBy: String!
      assignedTo: String!
      status: String!
    ): Todo!
    updateTodo(id: Int!, status: String!): Update!
    deleteTodo(id: Int!): Delete!
  }
`;

module.exports = todoDefs;
