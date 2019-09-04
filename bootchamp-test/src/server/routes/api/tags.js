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

router.get("/search/:name", async (req, res) => {
  const tags = await loadTags();
  res.send(
    await tags.findOne({
      label: req.params.name
    })
  );
});

router.get("/matches/:name", async (req, res) => {
  const tags = await loadTags();
  let term = req.params.name.toLowerCase();
  res.send(
    await tags
      .find({
        label: { $regex: new RegExp(req.params.name) }
      })
      .toArray()
  );
});

// add tags - !
router.post("/", async (req, res) => {
  const tags = await loadTags();
  await tags.insertOne({
    id: req.body.id,
    label: req.body.label
  });
  res.status(201).send(
    await tags.findOne({
      id: req.body.id
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
