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
  //console.log(req.query.email);
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
    online: req.body.online
  });
  res.status(201).send(
    await contributors.findOne({
      id: req.body.id
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
