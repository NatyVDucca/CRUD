const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Camionero extends Model {}

Camionero.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    salario: DataTypes.DATE,
    region: DataTypes.DATE
}, {
    sequelize,
    modelName: 'Camionero',
    tableName: 'Camioneros'
})

module.exports = Camionero