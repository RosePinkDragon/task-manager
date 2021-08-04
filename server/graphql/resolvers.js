const models = require("../models");
const bcrypt = require("bcrypt");
const valid = require("../utils/valid");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { finished } = require("stream");
const { GraphQLUpload } = require("graphql-upload");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = ({ name, id, email }) => {
  return jwt.sign({ name, id, email }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

const resolvers = {
  Query: {
    getTodo: async (
      _,
      {
        filterTitle,
        currentStatus,
        createdBy,
        assignedTo,
        sortBy,
        order,
        offset,
        limit,
      }
    ) => {
      const { count, rows: todo } = await models.Todo.findAndCountAll({
        where: {
          taskTitle: {
            [Op.like]: `%${filterTitle}%` || "%",
          },
          createdBy: {
            [Op.like]: createdBy || "%",
          },
          assignedTo: {
            [Op.like]: assignedTo || "%",
          },
          status: {
            [Op.like]: currentStatus || "%",
          },
        },
        offset: offset || 0,
        limit: limit || 10,
        order: [[sortBy, order]],
      });

      return { count, todo };
    },

    getSingleTodo: async (_, { id }) => {
      const todos = await models.Todo.findByPk(id);
      return [todos];
    },

    getUsers: async () => {
      return models.User.findAll();
    },

    loginGoogle: async (_, { name, email }) => {
      const checkUser = await models.User.findOne({ where: { email: email } });
      if (checkUser === null) {
        const user = await models.User.create({
          name,
          email,
          password: "from_Google",
        });
        const token = createToken(user);
        return { user, token };
      }

      const token = createToken(user);
      return { user, token };
    },

    loginUser: async (_, { email, password }) => {
      const user = await models.User.findOne({ where: { email: email } });
      if (user !== null) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          const token = createToken(user);
          return { user, token };
        }
        throw Error("Incorrect Details");
      }
      throw Error("User Not Found");
    },
  },
  Upload: GraphQLUpload,
  Mutation: {
    singleUpload: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const out = require("fs").createWriteStream("local-file-output.txt");
      stream.pipe(out);
      await finished(out);
      console.log(filename, mimetype, encoding);
      return { filename, mimetype, encoding };
    },

    createTodo: async (
      _,
      { taskTitle, createdBy, assignedTo, status },
      { user }
    ) => {
      const isUser = await models.User.findOne({
        where: { email: user.email },
      });
      if (!isUser || isUser === null) {
        throw Error("User Not Found");
      }
      createdBy = isUser.dataValues.name;
      status = "Created";
      valid(taskTitle, createdBy, assignedTo, status);
      return models.Todo.create({
        taskTitle,
        createdBy,
        assignedTo,
        status,
      });
    },

    createUser: async (_, { name, email, password }) => {
      const users = await models.User.create({ name, email, password });
      return users;
    },

    updateTodo: async (_, { id, status }) => {
      const todo = await models.Todo.findByPk(id);
      if (todo === null) {
        return { success: false };
      }
      const { dataValues } = await todo.update({ status: status });
      return { success: true, todo: dataValues };
    },

    deleteTodo: async (_, { id }) => {
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
