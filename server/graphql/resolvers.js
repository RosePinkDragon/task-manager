const models = require("../models");
const bcrypt = require("bcrypt");
const valid = require("../utils/Invalid");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = ({name, id, email}) => {
  return jwt.sign({name, id, email}, process.env.SECRET, { expiresIn: maxAge });
};

const resolvers = {
  Query: {
    async getTodo(_, {filterTitle,sortBy}) {
      const {count, rows : todo} = await models.Todo.findAndCountAll({
        where: {
          taskTitle: {
            [Op.like]: filterTitle || '%'
          }
        },
      });

      return {count, todo} 
    },

    async getSingleTodo(_, { id }) {
      const todos = await models.Todo.findByPk(id);
      return [todos];
    },

    async getUsers() {
      return models.User.findAll();
    },

    async loginGoogle(_, {name, email}) {
      const checkUser =  await models.User.findOne({where: {email:email}})
      if(checkUser === null){
        const user= await models.User.create({ name, email, password: "from_Google" });
        const token = createToken(user)
        return {user,token};
      }
      
      const token = createToken(user)
          return {user, token};
    },

    async loginUser(_, { email, password }, {req}) {
      const user = await models.User.findOne({ where: { email: email } });
      if (user !== null) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          const token = createToken(user)
          return {user, token};
        }
        throw Error("Incorrect Details");
      }
      throw Error("User Not Found");
    },
  },

  Mutation: {
    async createTodo(_, { taskTitle, createdBy, assignedTo, status },{user}) {
      
      const isUser = await models.User.findOne({where:{email: user.email}})
      if(!isUser || isUser === null){
        throw Error("User Not Found")
      }
      createdBy = isUser.dataValues.name
      status= "Created"
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

    async updateTodo(_, { id, status }) {
      const todo = await models.Todo.findByPk(id)
      if(todo === null){
        return {success: false}
      }
      const {dataValues} = await todo.update({status:status});
      return { success:true , dataValues }
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
