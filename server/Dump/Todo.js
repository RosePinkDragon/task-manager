module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    taskTitle: {
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    assignedTo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.ENUM("Created", "Completed", "Ongoing"),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Todo;
};
