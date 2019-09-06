const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const { loadTopics, loadContributors } = require("./databases");

// 1). get topics
router.get("/", async (req, res) => {
  const topics = await loadTopics();
  res.send(await topics.find({}).toArray());
});

// 2). Return specific topic by id
router.get("/:id", async (req, res) => {
  const topics = await loadTopics();
  res.send(
    await topics.findOne({
      id: req.params.id
    })
  );
});

// 3).  Search for topic name - not working yet
router.get("/match/:search", async (req, res) => {
  const topics = await loadTopics();
  let term = req.params.search.toLowerCase();
  let regex = new RegExp("" + term, "i");
  res.send(
    await topics
      .find({
        name: regex
      })
      .toArray()
  );
});

// 4). Query User's Topics
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

// 5). Query topic by tag element
router.get("/tags/:id", async (req, res) => {
  const topics = await loadTopics();
  res.send(
    await topics
      .find({
        tags: {
          $in: req.body.searchTags
        }
      })
      .toArray()
  );
});

// 6). Query topic by city element - needs to be an id
router.get("/cities/", async (req, res) => {
  const topics = await loadTopics();
  res.send(
    await topics
      .find({
        cities: req.body.searchCity
      })
      .toArray()
  );
});

// 7). POST/ add new topic
router.post("/", async (req, res) => {
  const topics = await loadTopics();
  const contributors = await loadContributors();
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

// 8). Patch a topic fully
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

// 9). Add a like to a topic
router.patch("/like/:id", async (req, res) => {
  const topics = await loadTopics();
  await topics.updateOne(
    {
      id: req.params.id
    },
    {
      $addToSet: {
        likedBy: req.body.likedBy
      }
    }
  );
  res.status(201).send(
    await topics.findOne({
      id: req.params.id
    })
  );
});

// 10). delete topic by id
router.delete("/:id", async (req, res) => {
  const topics = await loadTopics();
  await topics.deleteOne({ id: req.params.id });
  res.status(200).send();
});

module.exports = router;
