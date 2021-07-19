"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "FakeUser3@fakemail.com",
        password: "thispassgood??",
        name: "FakeUser3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "FakeUser2@fakemail.com",
        password: "thispassgood??",
        name: "FakeUser2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "FakeUser@fakemail.com",
        password: "thispassgood??",
        name: "FakeUser",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
