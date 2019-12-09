const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const { loadMeetups } = require('./databases')

// 1). Query all meetups:
router.get('/', async (req, res) => {
  const meetups = await loadMeetups()
  res.send(await meetups.find({}).toArray())
})

// 2). Get Specific Meetup by ID
router.get('/:id', async (req, res) => {
  const meetups = await loadMeetups()
  res.send(
    await meetups.findOne({
      id: req.params.id
    })
  )
})

// 3). Search meetups for part label match (while typing):
router.get('/search/:name', async (req, res) => {
  const meetups = await loadMeetups()
  let term = req.params.name.toLowerCase()
  res.send(
    await meetups
      .find({
        name: { $regex: new RegExp(term) }
      })
      .toArray()
  )
})

// 4). Create new Tag - POST
router.post('/', async (req, res) => {
  const meetups = await loadMeetups()
  await meetups.insertOne({
    id: req.body.id,
    name: req.body.name,
    link: req.body.link,
    description: req.body.description
  })
  res.status(201).send(
    await meetups.findOne({
      id: req.body.id
    })
  )
})

// 6). Delete Specific Tag by ID
router.patch('/edit/:id', async (req, res) => {
  const meetups = await loadMeetups()
  await meetups.updateOne(
    { id: req.params.id },
    {
      $set: {
        name: req.body.name,
        link: req.body.link,
        description: req.body.description
      }
    }
  )
  res.status(201).send(
    await meetups.findOne({
      id: req.params.id
    })
  )
})

// 6). Delete Specific Tag by ID
router.delete('/:id', async (req, res) => {
  const meetups = await loadMeetups()
  await meetups.deleteOne({ id: req.params.id })
  res.status(200).send(true)
})

module.exports = router
