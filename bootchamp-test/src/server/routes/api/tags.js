const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const { loadTags } = require("./databases");

// get tags -
router.get("/", async (req, res) => {
  const tags = await loadTags();
  res.send(await tags.find({}).toArray());
});

// !
router.get("/:id", async (req, res) => {
  const tags = await loadTags();
  res.send(
    await tags.findOne({
      id: req.params.id
    })
  );
});

// add tags - !
router.post("/", async (req, res) => {
  const tags = await loadTags();
  await tags.insertOne({
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
    await tags.findOne({
      id: req.body.id
    })
  );
});

router.patch("/:id", async (req, res) => {
  const tags = await loadTags();
  await tags.updateOne(
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
    await tags.findOne({
      id: req.params.id
    })
  );
});

router.patch("/like/:id", async (req, res) => {
  const tags = await loadTags();
  let topicLike = await tags.findOne({
    id: req.params.id
  });

  topicLike.likedBy.push("NewLike");
  await tags.updateOne(
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
    await tags.findOne({
      id: req.params.id
    })
  );
});

// delete tags - !
router.delete("/:id", async (req, res) => {
  const tags = await loadTags();
  await tags.deleteOne({ id: req.params.id });
  res.status(200).send();
});

module.exports = router;
