const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Camion extends Model {}

Camion.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    matricula: DataTypes.STRING,
    modelo: DataTypes.STRING,
    tipo: DataTypes.STRING,
    potencia: DataTypes.DATE,
   
}, {
    sequelize,
    modelName: 'Camion',
    tableName: 'Camiones'
})

module.exports = Camion