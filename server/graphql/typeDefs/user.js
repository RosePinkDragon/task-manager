const { gql } = require("apollo-server-express");

const userDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
  }

  type Login {
    token: String!
    user: User!
  }

  type Query {
    getUsers: [User!]!
    loginUser(email: String!, password: String!): Login!
    loginGoogle(email: String!, name: String!): Login!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
  }
`;
module.exports = userDefs;
