const models = require("../models");
const bcrypt = require("bcrypt");
const valid = require("../utils/Invalid");

const resolvers = {
  Query: {
    async getTodo(root, args) {
      const todos = await models.Todo.findAll();
      return todos;
    },

    async getSingleTodo(root, { id }) {
      const todos = await models.Todo.findByPk(id);
      return [todos];
    },

    async getUsers(root, { id }) {
      return models.User.findAll();
    },

    async loginUser(root, { email, password }) {
      const user = await models.User.findOne({ where: { email: email } });
      if (user !== null) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          return user;
        }
        throw Error("Incorrect Details");
      }
      throw Error("User Not Found");
    },
  },

  Mutation: {
    async createTodo(root, { taskTitle, createdBy, assignedTo, status }) {
      
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

    async createUser(root, { name, email, password }) {
      const users = await models.User.create({ name, email, password });
      console.log(users);
      return users;
    },

    async deleteTodo(root, { id }) {
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
