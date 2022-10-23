const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Paquete extends Model {}

Paquete.init({
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT
}, {
    sequelize,
    modelName: 'paquete',
    tableName: 'paquetes'
})

module.exports = Paquete