const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Parents", "Admin", "SuperAdmin"),
      allowNull: false,
    },
    subtype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // Valor por defecto usuarios creados de forma manual sin provenir de AUTH0
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidoPaterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidoMaterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    validate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

  });
};
