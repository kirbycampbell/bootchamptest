const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// get cities -
router.get("/", async (req, res) => {
  const cities = await loadCities();
  res.send(await cities.find({}).toArray());
});

// !
router.get("/:id", async (req, res) => {
  const cities = await loadCities();
  res.send(
    await cities.findOne({
      id: req.params.id
    })
  );
});

// !
router.get("/editcity/:id", async (req, res) => {
  const cities = await loadCities();
  res.send(
    await cities
      .find({
        createdBy: req.params.id
      })
      .toArray()
  );
});

// add cities - !
router.post("/", async (req, res) => {
  const cities = await loadCities();
  await cities.insertOne({
    id: req.body.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: req.body.name,
    state: req.body.state,
    meetupList: req.body.meetupList,
    members: req.body.members,
    resources: req.body.resources,
    localTopics: req.body.localTopics
  });
  res.status(201).send(
    await cities.findOne({
      id: req.body.id
    })
  );
});

router.patch("/:id", async (req, res) => {
  const cities = await loadCities();
  await cities.updateOne(
    {
      id: req.params.id
    },
    {
      $set: {
        name: req.body.name,
        state: req.body.state,
        updatedAt: new Date(),
        meetupList: [],
        members: [],
        resources: [],
        localTopics: []
      }
    }
  );
  res.status(201).send(
    await cities.findOne({
      id: req.params.id
    })
  );
});

router.patch("/like/:id", async (req, res) => {
  const cities = await loadCities();
  let topicLike = await cities.findOne({
    id: req.params.id
  });

  topicLike.likedBy.push("NewLike");
  await cities.updateOne(
    {
      id: req.params.id
    },
    {
      $set: {
        likedBy: topicLike.likedBy
      }
    }
  );
  res.status(201).send(
    await cities.findOne({
      id: req.params.id
    })
  );
});

// delete cities - !
router.delete("/:id", async (req, res) => {
  const cities = await loadCities();
  await cities.deleteOne({ id: req.params.id });
  res.status(200).send();
});

//loadPostsCollection from MongoDB
async function loadCities() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://bootchampAdmin:adminBootchamp1@ds355357.mlab.com:55357/bootchamp",
    {
      useNewUrlParser: true
    }
  );
  return client.db("bootchamp").collection("cities");
}

module.exports = router;
