const express = require('express')
const { seed, Pet } = require('./models')

const app = express()

// Get all pets
app.get('/pet', async (req, res) => {

  // get the data from the db
  const data = await Pet.findAll()
  res.send(data)
})

// Get pet by id (route param)
app.get('/pet/:id', async (req, res) => {

  // try to find the pet
  const data = await Pet.findByPk(req.params.id)

  // if it can't be found, send a useful error
  if (!data) {
    res.status(404).send(`No pet with id ${req.params.id}`)
    return
  }

  // otherwise, send the data!
  res.send(data)
})

async function main () {

  // wait for the db to get filled with data
  await seed()

  //then start the server
  const PORT = 5000
  app.listen(PORT, () => { console.log(`Listening on port ${PORT}.`) })
}

main()
