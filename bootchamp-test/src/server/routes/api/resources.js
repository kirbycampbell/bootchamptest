const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const { loadResources } = require("./databases");

// Resources are only created in
// City Models... Always joined together!

// 1). Query All Resources:
router.get("/", async (req, res) => {
  const resources = await loadResources();
  res.send(await resources.find({}).toArray());
});

// 2). Get Specific Resource by id
router.get("/:id", async (req, res) => {
  const resources = await loadResources();
  res.send(
    await resources.findOne({
      id: req.params.id
    })
  );
});

// 3). Find Resources by City id
router.get("/find/:city", async (req, res) => {
  const resources = await loadResources();
  res.send(
    await resources
      .find({
        city: req.params.city
      })
      .toArray()
  );
});

// 4).  Create New Resource - POST
router.post("/", async (req, res) => {
  const resources = await loadResources();
  await resources.insertOne({
    id: req.body.id,
    updatedAt: new Date(),
    title: req.body.title,
    content: {
      text: req.body.content.text,
      link: req.body.content.link
    },
    city: req.body.city,
    tags: req.body.tags
  });
  res.status(201).send(
    await resources.findOne({
      id: req.body.id
    })
  );
});

// 5). Delete Resource by id
router.delete("/:id", async (req, res) => {
  const resources = await loadResources();
  await resources.deleteOne({ id: req.params.id });
  res.status(200).send();
});

// 6). Search for Resource by tags
router.get("/find-tag/:tag", async (req, res) => {
  const resources = await loadResources();
  res.send(
    await resources
      .find({
        tags: req.params.tag
      })
      .toArray()
  );
});

// 7). Search for Resource by tags & city
router.get("/find-tag/:tag/:city", async (req, res) => {
  const resources = await loadResources();
  res.send(
    await resources
      .find({
        tags: req.params.tag,
        city: req.params.city
      })
      .toArray()
  );
});

module.exports = router;
