"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Todos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      taskTitle: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
        validate: {
          is: /^[a-z]+$/i,
          notEmpty: true,
          len: [4, 20],
        },
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
        is: /^[a-z]+$/i,
        validate: {
          notEmpty: true,
          len: [4, 20],
        },
      },
      assignedTo: {
        type: Sequelize.STRING,
        allowNull: false,
        is: /^[a-z]+$/i,
        validate: {
          notEmpty: true,
          len: [4, 20],
        },
      },
      status: {
        type: Sequelize.ENUM("Created", "Completed", "Ongoing"),
        allowNull: false,
        is: /^[a-z]+$/i,
        validate: {
          notEmpty: true,
          len: [4, 20],
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Todos");
  },
};
