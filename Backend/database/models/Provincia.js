const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Provincia extends Model {}

Provincia.init({
    nif: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre: DataTypes.STRING,
    codProvincia: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Provincia',
    tableName: 'Provincias'
})

module.exports = Provincia