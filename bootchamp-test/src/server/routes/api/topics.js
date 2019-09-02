const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();

// get topics -
router.get("/", async (req, res) => {
  const topics = await loadTopics();
  res.send(await topics.find({}).toArray());
});

// !
router.get("/:id", async (req, res) => {
  const topics = await loadTopics();
  res.send(
    await topics.findOne({
      id: req.params.id
    })
  );
});

router.get("/match", async (req, res) => {
  const topics = await loadTopics();
  res.send(
    await topics.findOne({
      name: { eq: req.params.searchTerm }
    })
  );
  console.log("Search is happening");
});

// !
router.get("/usertopics/:id", async (req, res) => {
  const topics = await loadTopics();
  res.send(
    await topics
      .find({
        createdBy: req.params.id
      })
      .toArray()
  );
});

// add topics - !
router.post("/", async (req, res) => {
  const topics = await loadTopics();
  await topics.insertOne({
    id: req.body.id,
    name: req.body.name,
    content: { images: [""], link: "", code: "", video: "", text: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: req.body.createdBy,
    likedBy: [],
    cities: [],
    tags: []
  });
  res.status(201).send(
    await topics.findOne({
      id: req.body.id
    })
  );
});

router.patch("/:id", async (req, res) => {
  const topics = await loadTopics();
  await topics.updateOne(
    {
      id: req.params.id
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
  );
  res.status(201).send(
    await topics.findOne({
      id: req.params.id
    })
  );
});

router.patch("/like/:id", async (req, res) => {
  const topics = await loadTopics();
  let topicLike = await topics.findOne({
    id: req.params.id
  });

  topicLike.likedBy.push("NewLike");
  await topics.updateOne(
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
    await topics.findOne({
      id: req.params.id
    })
  );
});

// delete topics - !
router.delete("/:id", async (req, res) => {
  const topics = await loadTopics();
  await topics.deleteOne({ id: req.params.id });
  res.status(200).send();
});

//loadPostsCollection from MongoDB
async function loadTopics() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://bootchampAdmin:adminBootchamp1@ds355357.mlab.com:55357/bootchamp",
    {
      useNewUrlParser: true
    }
  );
  return client.db("bootchamp").collection("topics");
}

module.exports = router;
