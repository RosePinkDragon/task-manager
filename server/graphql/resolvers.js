const models = require("../models");
const bcrypt = require("bcrypt");
const valid = require("../utils/Invalid");
const jwt = require("jsonwebtoken")

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = ({name, id, email}) => {
  return jwt.sign({name, id, email}, process.env.SECRET, { expiresIn: maxAge });
};

const resolvers = {
  Query: {
    async getTodo() {
      const todos = await models.Todo.findAll();
      return todos;
    },

    async getSingleTodo(_, { id }) {
      const todos = await models.Todo.findByPk(id);
      return [todos];
    },

    async getUsers() {
      return models.User.findAll();
    },

    async loginUser(_, { email, password }, {req}) {
      const user = await models.User.findOne({ where: { email: email } });
      if (user !== null) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          const token = createToken(user)
          console.log({user, token})
          return {user, token};
        }
        throw Error("Incorrect Details");
      }
      throw Error("User Not Found");
    },
  },

  Mutation: {
    async createTodo(_, { taskTitle, createdBy, assignedTo, status }) {
      
      const eval = valid(taskTitle, createdBy, assignedTo, status)

      if(eval !== true){
        throw Error(eval)
      } 

      return models.Todo.create({
        taskTitle,
        createdBy,
        assignedTo,
        status,
      });
    },

    async createUser(_, { name, email, password }) {
      const users = await models.User.create({ name, email, password });
      return users;
    },

    async deleteTodo(_, { id }) {
      const deleted = await models.Todo.destroy({ where: { id: id } });
      if (deleted === 1) {
        return { status: "Deleted" };
      }
      if (deleted === 0) {
        return { status: "Failed to delete" };
      }
    },
  },
};

module.exports = resolvers;
