const { isEmail } = require("validator");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return User;
};
