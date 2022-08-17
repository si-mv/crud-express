const express = require('express')
const { seed, Pet } = require('./models')
const { logTable } = require('sequelize-logger')

const app = express()
// app at the moment, doesn't know how to turn the Body of a request
// into a javascript object (it just gets sent as a string!)
// the below gives app the power to parse body into a js object:
app.use(express.json())

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

// Delete a pet by id
app.delete('/pet/:id', async (req, res) => {
  const deleted = await Pet.destroy({
    where: { id: req.params.id }
  })
  
  if (!deleted) {
    res.status(404).send(`No pet with id ${req.params.id}`)
    return
  }

  await logTable(Pet)
  res.status(202).send(`Pet with id ${req.params.id} was deleted.`)
})

// create a new pet
app.post('/pet', async (req, res) => {
  // the user's data is in req.body
  // we use that date to make a new pet in the db:
  try {
    await Pet.create(req.body)
    res.sendStatus(201)
  } catch (error) {
    res.status(400).send(error.errors)
  }
  await logTable(Pet)
})

// update a pet by id
app.put('/pet/:id', async (req, res) => {
  const petToUpdate = await Pet.findByPk(req.params.id)

  if (!petToUpdate) {
    res.sendStatus(404)
    return
  }

  try {
    await petToUpdate.update(req.body)
    res.sendStatus(200)
  } catch (error) {
    res.status(400).send(error.errors)
  }

  logTable(Pet)

})

async function main () {

  // wait for the db to get filled with data
  await seed()

  //then start the server
  const PORT = 5000
  app.listen(PORT, () => { console.log(`Listening on port ${PORT}.`) })
}

main()
