const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const { loadCities, loadTopics } = require('./databases')

// 1). Get cities -
router.get('/', async (req, res) => {
  const cities = await loadCities()
  res.send(await cities.find({}).toArray())
})

// 2). Get City by ID
router.get('/:id', async (req, res) => {
  const cities = await loadCities()
  res.send(
    await cities.findOne({
      id: req.params.id
    })
  )
})

// 2.3). Search Cities for part label match (while typing):
router.get('/matches/:city', async (req, res) => {
  const cities = await loadCities()
  let term = req.params.city.toLowerCase()
  let regex = new RegExp('^' + term, 'i')
  res.send(
    await cities
      .find({
        name: regex
      })
      .toArray()
  )
})

// 2.4). Search State for part label match (while typing):
router.get('/state_matches/:state', async (req, res) => {
  const cities = await loadCities()
  let term = req.params.state.toLowerCase()
  let regex = new RegExp('^' + term, 'i')
  res.send(
    await cities
      .find({
        state: regex
      })
      .toArray()
  )
})

// 3). Create a New City
router.post('/', async (req, res) => {
  const cities = await loadCities()
  await cities.insertOne({
    id: req.body.id,
    name: req.body.name,
    state: req.body.state,
    meetupList: [],
    members: [],
    resources: [],
    localTopics: []
  })
  res.status(201).send(
    await cities.findOne({
      id: req.body.id
    })
  )
})

// 4). Add new meetup to City's meetupList
router.patch('/addMeetup/:id', async (req, res) => {
  const cities = await loadCities()
  await cities.updateOne(
    {
      id: req.params.id
    },
    {
      $addToSet: {
        meetupList: req.body.meetup
      }
    }
  )
  res.status(201).send(
    await cities.findOne({
      id: req.params.id
    })
  )
})

// 5). Add new member to City's members array
router.patch('/members/:id', async (req, res) => {
  const cities = await loadCities()
  await cities.updateOne(
    {
      id: req.params.id
    },
    {
      $addToSet: {
        members: req.body.members
      }
    }
  )
  res.status(201).send(
    await cities.findOne({
      id: req.params.id
    })
  )
})

// 6). Add new resource to City's resources array
router.patch('/addResource/:id', async (req, res) => {
  const cities = await loadCities()
  await cities.updateOne(
    {
      id: req.params.id
    },
    {
      $addToSet: {
        resources: req.body.newResource
      }
    }
  )
  res.status(201).send(
    await cities.findOne({
      id: req.params.id
    })
  )
})

// 6). Add new topic to City's localTopics array
router.patch('/addLocalTopic/:id', async (req, res) => {
  const topics = await loadTopics()
  const cities = await loadCities()
  await topics.updateOne(
    {
      id: req.body.topicId
    },
    {
      $set: {
        name: req.body.name,
        likedBy: req.body.likedBy,
        updatedAt: new Date(),
        tags: req.body.tags,
        cities: req.body.cities,
        content: req.body.content
      }
    }
  )
  let cityTopic = await topics.findOne({
    id: req.params.id
  })
  await cities.updateOne(
    {
      id: req.params.id
    },
    {
      $addToSet: {
        localTopics: cityTopic.id
      }
    }
  )
  res.status(201).send(
    await cities.findOne({
      id: req.params.id
    })
  )
})

// 10). delete cities
router.delete('/:id', async (req, res) => {
  const cities = await loadCities()
  await cities.deleteOne({ id: req.params.id })
  res.status(200).send(true)
})

module.exports = router
