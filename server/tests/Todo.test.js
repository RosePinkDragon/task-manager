const { gql } = require("apollo-server-express");
const todoDefs = require("../graphql/typeDefs/todo");
const userDefs = require("../graphql/typeDefs/user");
const EasyGraphqlTest = require("easygraphql-tester");
const resolvers = require("../graphql/resolvers");

const expectedTodo = gql`
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

test("Check if todo has correct feilds", () => {
  expect(todoDefs).toEqual(expectedTodo);
});

describe("Gets an array on todos", () => {
  const tester = new EasyGraphqlTest([todoDefs, userDefs], resolvers);

  const query = `
  query getTodo(
    $filterTitle: String!
    $sortBy: String!
    $order: String!
    $limit: Int!
    $offset: Int!
  ) {
    getTodo(
      filterTitle: $filterTitle
      sortBy: $sortBy
      order: $order
      limit: $limit
      offset: $offset 
    ) {
      count
      todo {
        id
        taskTitle
        createdBy
        status
        assignedTo
        createdAt
        updatedAt
      }
    }
  }
  `;

  const variables = {
    filterTitle: "",
    sortBy: "id",
    order: "ASC",
    limit: 10,
    offset: 2,
  };

  const { data, errors } = tester.mock({
    query,
    variables,
  });
  test("type of data is an object", () => {
    expect(typeof data).toBe("object");
  });
  test("Gets only 10 todos or less at a time", () => {
    expect(data.getTodo.todo.length).toBeLessThanOrEqual(10);
  });
});

describe("get's a todo", () => {
  const tester = new EasyGraphqlTest([todoDefs, userDefs], resolvers);

  const query = `
  query getSingleTodo($id: Int!) {
    getSingleTodo(id: $id) {
        id
        taskTitle
        createdBy
        status
        assignedTo
        createdAt
        updatedAt
      }
    }
`;

  const variables = {
    id: 1,
  };

  const { data, errors } = tester.mock({
    query,
    variables,
  });
  test("It gets data as an object", () => {
    expect(typeof data).toBe("object");
  });
  test("Gets a todo", () => {
    expect(typeof data.getSingleTodo).toBe("object");
  });
  test("todos have the requried feilds", () => {
    expect(
      data.getSingleTodo.map((todo) => {
        {
          todo.id,
            todo.taskTitle,
            todo.createdBy,
            todo.status,
            todo.assignedTo,
            todo.createdAt,
            todo.updatedAt;
        }
      })
    ).toBeDefined();
  });
});

describe("throws a error", () => {
  const tester = new EasyGraphqlTest([todoDefs, userDefs], resolvers);
  const query = `
  query getSingleTodo($id: Int!) {
    getSingleTodo(id: $id) {
        id
        taskTitle
        createdBy
        status
        assignedTo
      }
    }
`;

  const variables = {};

  const { data, errors } = tester.mock({
    query,
    variables,
    mockErrors: true,
  });

  test("doesnt return data", () => {
    expect(data).toBeUndefined();
  });

  test("Checks Error", () => {
    expect(errors).toBeDefined();
  });
});
