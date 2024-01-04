const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
     sequelize.define(
          "Grade", {
          id: {
               type: DataTypes.UUID,
               defaultValue: DataTypes.UUIDV4,
               primaryKey: true,
               unique: true,
          },
          gradename: {
               type: DataTypes.STRING,
               allowNull: false, 
               //unique: true,
          },
          gradequota: {
               type: DataTypes.INTEGER,
               allowNull: false,
             
          },
          state: {
               type: DataTypes.BOOLEAN,
               defaultValue: true,
          }
     }
     )
}