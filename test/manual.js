// import the seed function
const { seed, Pet } = require('../models')
const { logTable } = require('sequelize-logger')

async function test () {

  // wait for the seed function to finish
  await seed()

  // log the Pets table to make sure it got filled correctly
  await logTable(Pet)

}

test()
