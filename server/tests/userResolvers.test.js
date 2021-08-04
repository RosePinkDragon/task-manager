const resolvers = require("../graphql/resolvers");
var casual = require("casual");
const dotenv = require("dotenv");
dotenv.config();

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

describe("Logs a user", () => {
  const logUser = resolvers.Query.loginUser;

  const userData = {
    email: "test@email.com",
    password: "test123",
  };

  test("returns the logged user", async () => {
    const { user, token } = await logUser("", { ...userData });
    console.log(user, token);
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(typeof user).toBe("object");
    expect(user).toHaveProperty("email", userData.email);
    expect(user).not.toHaveProperty("password", userData.password);
    expect(user.dataValues).toHaveProperty("id");
    expect(user.dataValues).toHaveProperty("email");
    expect(user.dataValues).toHaveProperty("password");
    expect(user.dataValues).toHaveProperty("name");
    expect(user.dataValues).toHaveProperty("createdAt");
    expect(user.dataValues).toHaveProperty("updatedAt");
  });
});
