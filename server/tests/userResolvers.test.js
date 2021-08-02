const resolvers = require("../graphql/resolvers");
var casual = require("casual");

describe("Creates a user", () => {
  const createUser = resolvers.Mutation.createUser;

  const newUserData = {
    name: casual.name,
    email: casual.email,
    password: casual.password,
  };

  test("create a user", async () => {
    const { dataValues } = await createUser("", { ...newUserData });
    console.log(dataValues);
    expect(typeof dataValues).toBeDefined();
    expect(typeof dataValues).toBe("object");
    expect(dataValues).toHaveProperty("name", newUserData.name);
    expect(dataValues).toHaveProperty("email", newUserData.email);
    expect(dataValues).not.toHaveProperty("password", newUserData.password);
  });
});
