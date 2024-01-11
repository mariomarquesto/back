const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
     sequelize.define('Estudiante', {
          id: {
               type: DataTypes.UUID,
               defaultValue: DataTypes.UUIDV4,
               allowNull: false,
               primaryKey: true,
          },
          idDocumento: {
               type: DataTypes.INTEGER,
               allowNull: false,
          },
          nombres: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          apellidoPat: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          apellidoMat: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          Nacionalidad: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          fechNac: {
               type: DataTypes.DATE,
               allowNull: false,
          },
          sexo: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          peso: {
               type: DataTypes.INTEGER,
               allowNull: false,
          },
          estatura: {
               type: DataTypes.INTEGER,
               allowNull: false,
          },
          alergias: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          grupoSanguineo: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          contactoEmerg: {
               type: DataTypes.INTEGER,
               allowNull: false,
          },
          fotoPerfil: {
               type: DataTypes.STRING,
               allowNull: false,

          },
          fotoDocumento: {
               type: DataTypes.STRING,
               allowNull: false,

          },
          validate: {
               type: DataTypes.BOOLEAN,
               defaultValue: false,
          },
          estadoPago: {
               type: DataTypes.BOOLEAN,
               defaultValue: false,
          },
          state: {
               type: DataTypes.BOOLEAN,
               allowNull: true,
          },
     },
          {
               timestamps: false

          });
};