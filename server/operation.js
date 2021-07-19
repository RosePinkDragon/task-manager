const { todoData, userData } = require("./data");
const { User, Todo } = require("./models");

app.get("/select", (req, res) => {
  Todo.findAll().then((todos) => {
    res.send(todos);
  });
});
app.get("/users", (req, res) => {
  User.findAll().then((todos) => {
    res.send(todos);
  });
});

app.get("/insert", (req, res) => {
  Todo.create({
    taskTitle: "Added as test",
    createdBy: "Aman",
    assignedTo: "Moheb",
    status: "Ongoing",
  })
    .then((todo) => {
      res.send(todo);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/bulk-insert", (req, res) => {
  console.log(userData);
  User.bulkCreate(userData)
    .then((todo) => {
      res.send(todo);
    })
    .catch((err) => {
      console.log("here err");
      console.log(err.original.code, err.original.sqlMessage);
    });
});

app.get("/delete", (req, res) => {
  User.destroy({ where: { id: 10 } });
});
