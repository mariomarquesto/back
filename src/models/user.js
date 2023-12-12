const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
     sequelize.define(
          "User", {
          id: {
               type: DataTypes.UUID,
               defaultValue: DataTypes.UUIDV4,
               primaryKey: true,
          },
          username: {
               type: DataTypes.STRING,
               allowNull: false,
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
          }
     }
     )
}