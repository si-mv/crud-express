const db = require('../db')
const { DataTypes } = require('sequelize')

const Pet = db.define('Pet', {
  animal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

module.exports = Pet
