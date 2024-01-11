const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Valoracion",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      easeOfUse: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      satisfaction: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      registrationProcess: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userInterface: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      features: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recommendation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      additionalComments: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }
    // {
    //   tableName: "Valoracion", // Define el nombre de la tabla como 'Valoracion' en la base de datos sino le agrega una (s). en principio ya no afecta que lo haga
    // }
  );
};
