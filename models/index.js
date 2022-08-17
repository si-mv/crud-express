const db = require('../db')
const Pet = require('./Pet')

// Adding fake data to a db is often called 'seeding' the db
async function seed () {

  // Deletes all the tables and recreates them empty
  await db.sync({ force: true })

  // Create some fake data
  await Pet.create({ animal: 'Parrot', name: 'Cleese', age: 207 })
  await Pet.create({ animal: 'Cat', name: 'Oreo Cookie', age: 12 })
  await Pet.create({ animal: 'Catfish', name: 'Mr. Krabs', age: 5 })

}

module.exports = { seed, Pet }
