const resolvers = require("../graphql/resolvers");
var casual = require("casual");

describe("check the todo feilds", () => {
  const getTodoParams = {
    filterTitle: "",
    currentStatus: "",
    createdBy: "",
    assignedTo: "",
    sortBy: "id",
    order: "ASC",
    offset: "",
    limit: "",
  };

  test("Gets a list of todo with count", async () => {
    const data = await resolvers.Query.getTodo("", { ...getTodoParams });
    expect(typeof data.count).toBe("number");
    expect(typeof data.count).toBeDefined();

    expect(typeof data.todo).toBe("object");
    expect(typeof data.todo).toBeDefined();
    expect(data.todo.length).toBeLessThanOrEqual(10);
  });
});

describe("check the feilds of single todo", () => {
  const id = 1;

  const expectedData = {
    id: 1,
    taskTitle: "This is a Task",
    createdBy: "mohebDabilkar",
    assignedTo: "mohebDabilkar",
    status: "Ongoing",
    createdAt: new Date(1626369869000),
    updatedAt: new Date(1627318245000),
  };

  test("Gets a single Todo", async () => {
    const data = await resolvers.Query.getSingleTodo("", { id });
    expect(typeof data[0]).toBe("object");
    expect(data[1]).toBeUndefined();
    expect(data[0].dataValues).toStrictEqual(expectedData);
  });
});

describe("creates a new todo", () => {
  // ?? we have to create a unique task for every test so we need to add a new date in front

  const enteredData = {
    taskTitle: casual.name,
    createdBy: casual.name,
    assignedTo: casual.name,
  };

  test("creates a todo", async () => {
    const user = {
      email: "test@gmail.com",
    };

    const { dataValues } = await resolvers.Mutation.createTodo(
      "",
      enteredData,
      { user }
    );
    expect(typeof dataValues).toBeDefined();
    expect(typeof dataValues).toBe("object");
    expect(dataValues).toHaveProperty("taskTitle");
    expect(dataValues).toHaveProperty("createdBy");
    expect(dataValues).toHaveProperty("assignedTo");
  });
});
