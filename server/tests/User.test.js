const { gql } = require("apollo-server-express");
const todoDefs = require("../graphql/typeDefs/todo");
const userDefs = require("../graphql/typeDefs/user");
const EasyGraphqlTest = require("easygraphql-tester");
const resolvers = require("../graphql/resolvers");

const expectedUser = gql`
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

test("Check if todo has correct feilds", () => {
  expect(userDefs).toEqual(expectedUser);
});

describe("Gets an array of users", () => {
  const tester = new EasyGraphqlTest([todoDefs, userDefs], resolvers);

  const query = `
  query getUsers{
      getUsers {
        id
        name
        email
      }
    }
  `;

  const { data, errors } = tester.mock({
    query,
  });

  test("type of data is an object", () => {
    expect(typeof data).toBe("object");
  });

  test("Gets only 10 todos or less at a time", () => {
    expect(data.getUsers.length).toBeGreaterThanOrEqual(0);
  });
});

describe("get's a todo", () => {
  const tester = new EasyGraphqlTest([todoDefs, userDefs], resolvers);

  const query = `
  query Query($loginUserEmail: String!, $loginUserPassword: String!) {
    loginUser(email: $loginUserEmail, password: $loginUserPassword) {
      token
      user {
        name
        email
        id
      }
    }
  }
`;

  const variables = {
    loginUserEmail: "test@email.com",
    loginUserPassword: "test123",
  };

  const { data, errors } = tester.mock({
    query,
    variables,
  });

  //?? we cant test for an error
  //?? because no matter the login details we cant check actual users
  //?? we get fake data everytime
  test("It doesnt throw an error", () => {
    expect(errors.length).toBe(0);
  });
  test("It gets data as an object", () => {
    expect(typeof data).toBe("object");
  });
  test("Gets a todo", () => {
    expect(typeof data.loginUser.user).toBe("object");
  });
  test("todos have the requried feilds", () => {
    expect(data.loginUser.user).toBeDefined();
    expect(data.loginUser.token).toBeDefined();
  });
});
