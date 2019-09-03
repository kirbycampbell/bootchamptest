const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// get contributors
router.get("/", async (req, res) => {
  const contributors = await loadContributors();
  res.send(await contributors.find({}).toArray());
});

router.get("/login", async (req, res) => {
  const contributors = await loadContributors();
  res.send(
    await contributors.findOne({
      email: req.query.email
    })
  );
});

// add contributors
router.post("/", async (req, res) => {
  const contributors = await loadContributors();
  await contributors.insertOne({
    id: req.body.id,
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    createdAt: new Date(),
    online: req.body.online,
    likedTopics: [],
    resourcesFollowed: [],
    friends: [],
    cities: [],
    topics: [],
    lastOnline: [],
    avatar: "",
    info: {}
  });
  res.status(201).send(
    await contributors.findOne({
      id: req.body.id
    })
  );
});

router.patch("/:id", async (req, res) => {
  const contributors = await loadContributors();
  await contributors.updateOne(
    {
      id: req.params.id
    },
    {
      $set: {
        name: req.body.name,
        online: req.body.online,
        likedTopics: req.body.likedTopics,
        resourcesFollowed: req.body.resourcesFollowed,
        friends: req.body.friends,
        cities: req.body.cities,
        topics: req.body.topics,
        lastOnline: req.body.lastOnline,
        avatar: req.body.avatar,
        info: req.body.info
      }
    }
  );
  res.status(201).send(
    await contributors.findOne({
      id: req.params.id
    })
  );
});

// delete contributors
router.delete("/:id", async (req, res) => {
  const contributors = await loadContributors();
  await contributors.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

//loadPostsCollection from MongoDB
async function loadContributors() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://bootchampAdmin:adminBootchamp1@ds355357.mlab.com:55357/bootchamp",
    {
      useNewUrlParser: true
    }
  );
  return client.db("bootchamp").collection("contributors");
}

module.exports = router;
