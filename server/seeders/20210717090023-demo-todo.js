"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Todos", [
      {
        taskTitle: "Paragon",
        createdBy: "FakeUser3",
        assignedTo: "FakeUser2",
        status: "Created",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskTitle: "Hexagon",
        createdBy: "FakeUser",
        assignedTo: "FakeUser3",
        status: "Ongoing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskTitle: "Decagon",
        createdBy: "Aman",
        assignedTo: "FakeUser2",
        status: "Completed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskTitle: "Iamgone",
        createdBy: "Aman",
        assignedTo: "Moheb",
        status: "Created",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Todos", null, {});
  },
};
