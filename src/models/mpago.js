const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
     sequelize.define(
          "Mpago", {
                iduser: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                idtrans: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    //unique: true,
                },
                nombreuser: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                apellidouser: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                descripcion: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                descripcion: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                monto: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                fechPago: {
                    type: DataTypes.DATE,
                    allowNull: false,
               },
         }
     );
};
     
     
