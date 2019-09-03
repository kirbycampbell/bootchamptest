const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// get resources -
router.get("/", async (req, res) => {
  const resources = await loadResources();
  res.send(await resources.find({}).toArray());
});

// !
router.get("/:id", async (req, res) => {
  const resources = await loadResources();
  res.send(
    await resources.findOne({
      id: req.params.id
    })
  );
});

// !
router.get("/editresource/:id", async (req, res) => {
  const resources = await loadResources();
  res.send(
    await resources
      .find({
        createdBy: req.params.id
      })
      .toArray()
  );
});

// add resources - !
router.post("/", async (req, res) => {
  const resources = await loadResources();
  await resources.insertOne({
    id: req.body.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: req.body.title,
    content: {
      text: "",
      link: ""
    },
    city: "",
    tags: []
  });
  res.status(201).send(
    await resources.findOne({
      id: req.body.id
    })
  );
});

router.patch("/:id", async (req, res) => {
  const resources = await loadResources();
  await resources.updateOne(
    {
      id: req.params.id
    },
    {
      $set: {
        title: req.body.title,
        state: req.body.state,
        updatedAt: new Date(),
        title: req.body.title,
        content: {
          text: "",
          link: ""
        },
        city: ""
      }
    }
  );
  res.status(201).send(
    await resources.findOne({
      id: req.params.id
    })
  );
});

router.patch("/like/:id", async (req, res) => {
  const resources = await loadResources();
  let topicLike = await resources.findOne({
    id: req.params.id
  });

  topicLike.likedBy.push("NewLike");
  await resources.updateOne(
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
    await resources.findOne({
      id: req.params.id
    })
  );
});

// delete resources - !
router.delete("/:id", async (req, res) => {
  const resources = await loadResources();
  await resources.deleteOne({ id: req.params.id });
  res.status(200).send();
});

//loadPostsCollection from MongoDB
async function loadResources() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://bootchampAdmin:adminBootchamp1@ds355357.mlab.com:55357/bootchamp",
    {
      useNewUrlParser: true
    }
  );
  return client.db("bootchamp").collection("resources");
}

module.exports = router;
