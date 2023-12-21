const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
     sequelize.define("Parents", {
          id: {
               type: DataTypes.UUID,
               defaultValue: DataTypes.UUIDV4,
               allowNull: false,
               primaryKey: true,
               unique: true,
          },
          idDoc: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
          },
          fotoDocumento: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          name: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          lastName: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          educationLevel: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          profession: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          address: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          jobAddress: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          telephone: {
               type: DataTypes.STRING,
               allowNull: true,
          },
          jobTelephone: {
               type: DataTypes.STRING,
               allowNull: true,
          },
          contactCellphone: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          email: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
          },
          tutor: {
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

/*

IdPadre	PK	
IdDocumento	Number	
Nombres	String	
Apellido Paterno	String	
Apellido Materno	String	
Nivel/Educ	String	
Profesion	String	
Direccion	String	
DireccionTrab	String	
TlfCasa	Number	
TlfTrabajo	Number	
TlfCelular	Number	
email	mail	
RepreLegal	Booleam


*/
