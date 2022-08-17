const db = require('../db')
const { DataTypes } = require('sequelize')

const Pet = db.define('Pet', {
  animal: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.INTEGER
  }
})

module.exports = Pet
