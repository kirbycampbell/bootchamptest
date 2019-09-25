const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const { loadTags } = require("./databases");

// 1). Query all Tags:
router.get("/", async (req, res) => {
  const tags = await loadTags();
  res.send(await tags.find({}).toArray());
});

// 2). Get Specific Tag by ID
router.get("/:id", async (req, res) => {
  const tags = await loadTags();
  res.send(
    await tags.findOne({
      id: req.params.id
    })
  );
});

// 3). Search Tags for exact label match:
router.get("/search/:label", async (req, res) => {
  const tags = await loadTags();
  res.send(
    await tags.findOne({
      label: req.params.label
    })
  );
});

// 4). Search Tags for part label match (while typing):
router.get("/matches/:label", async (req, res) => {
  const tags = await loadTags();
  let term = req.params.label.toLowerCase();
  res.send(
    await tags
      .find({
        label: { $regex: new RegExp(term) }
      })
      .toArray()
  );
});

// 5). Create new Tag - POST
router.post("/", async (req, res) => {
  const tags = await loadTags();
  await tags.insertOne({
    id: req.body.id,
    label: req.body.label,
    used: req.body.used
  });
  res.status(201).send(
    await tags.findOne({
      id: req.body.id
    })
  );
});

// 6). Delete Specific Tag by ID
router.delete("/:id", async (req, res) => {
  const tags = await loadTags();
  await tags.deleteOne({ id: req.params.id });
  res.status(200).send(true);
});

module.exports = router;
