const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const { loadResources } = require('./databases')

// Resources are only created in
// City Models... Always joined together!

// 1). Query All Resources:
router.get('/', async (req, res) => {
  const resources = await loadResources()
  res.send(await resources.find({}).toArray())
})

// 2). Get Specific Resource by id
router.get('/:id', async (req, res) => {
  const resources = await loadResources()
  res.send(
    await resources.findOne({
      id: req.params.id
    })
  )
})

// 3). Find Resources by City id
router.get('/find/:city', async (req, res) => {
  const resources = await loadResources()
  res.send(
    await resources
      .find({
        city: req.params.city
      })
      .toArray()
  )
})

// 3.5). Find Resources by Contributor id
router.get('/contributor/:id', async (req, res) => {
  const resources = await loadResources()
  res.send(
    await resources
      .find({
        'createdBy.id': req.params.id
      })
      .toArray()
  )
})

// 4).  Create New Resource - POST
router.post('/', async (req, res) => {
  let r = req.body
  const resources = await loadResources()
  await resources.insertOne({
    id: r.id,
    updatedAt: new Date(),
    title: r.title,
    text: r.text,
    link: r.link,
    city: {
      name: r.city.name,
      state: r.city.state,
      id: r.city.id
    },
    tags: r.tags,
    createdBy: {
      name: r.createdBy.name,
      id: r.createdBy.id
    },
    likes: []
  })
  res.status(201).send(
    await resources.findOne({
      id: r.id
    })
  )
})

// 5). Delete Resource by id
router.delete('/:id', async (req, res) => {
  const resources = await loadResources()
  await resources.deleteOne({ id: req.params.id })
  res.status(200).send()
})

// 6). Search for Resource by tags
router.get('/find-tag/:tag', async (req, res) => {
  const resources = await loadResources()
  res.send(
    await resources
      .find({
        tags: req.params.tag
      })
      .toArray()
  )
})

// 7). Search for Resource by tags & city
router.get('/find-tag/:tag/:city', async (req, res) => {
  const resources = await loadResources()
  res.send(
    await resources
      .find({
        tags: req.params.tag,
        city: req.params.city
      })
      .toArray()
  )
})

module.exports = router
