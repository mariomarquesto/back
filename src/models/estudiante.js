const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('estudiante', {
    idEstudiante:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    idDocumento:{
        type: DataTypes.INT,
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
      type: DataTypes.INT,
      allowNull: false,
    },
    estatura: {
        type: DataTypes.INT,
        allowNull: false,
      },
    alergias: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    grupoSanguineo: {
        type: DataTypes.INT,
        allowNull: false,
    },  
    contactoEmerg: {
        type: DataTypes.INT,
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
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  { 
   timestamps: false 
});
};