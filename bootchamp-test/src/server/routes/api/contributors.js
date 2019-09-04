const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();
const { loadContributors } = require("./databases");

// 1). Get all Contributors - QUERY
router.get("/", async (req, res) => {
  const contributors = await loadContributors();
  res.send(await contributors.find({}).toArray());
});

// 2). Get specific Contributor by Email (for login):
router.get("/login", async (req, res) => {
  const contributors = await loadContributors();
  res.send(
    await contributors.findOne({
      email: req.query.email
    })
  );
});

// 2.5) Patch User for Login by id
router.patch("/login/:id", async (req, res) => {
  const contributors = await loadContributors();
  await contributors.updateOne(
    { id: req.params.id },
    {
      $set: {
        online: true
      }
    }
  );
  res.status(201).send(
    await contributors.findOne({
      id: req.params.id
    })
  );
});

// 2.75) Patch User for Logout by id
router.patch("/logout/:id", async (req, res) => {
  const contributors = await loadContributors();
  await contributors.updateOne(
    { id: req.params.id },
    {
      $set: {
        online: false,
        lastOnline: Date.now()
      }
    }
  );
  res.status(201).send(
    await contributors.findOne({
      id: req.params.id
    })
  );
});

// 3). POST - Create a new Contributor
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

// 4). PATCH - Update Contributor Object (profile)
router.patch("/:id", async (req, res) => {
  const contributors = await loadContributors();
  await contributors.updateOne(
    {
      id: req.params.id
    },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
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

// 4.1). PATCH - Update Contributor's Cities
router.patch("/cities/:id", async (req, res) => {
  const contributors = await loadContributors();
  await contributors.updateOne(
    {
      id: req.params.id
    },
    {
      $addToSet: {
        cities: req.query.city
      }
    }
  );
  res.status(201).send(
    await contributors.findOne({
      id: req.params.id
    })
  );
});

// 4.2). PATCH - Update Contributor's Topics
router.patch("/topics/:id", async (req, res) => {
  const contributors = await loadContributors();
  await contributors.updateOne(
    {
      id: req.params.id
    },
    {
      $addToSet: {
        topics: req.query.topic
      }
    }
  );
  res.status(201).send(
    await contributors.findOne({
      id: req.params.id
    })
  );
});

// 4.3). PATCH - Update Contributor's Friends
router.patch("/friends/:id", async (req, res) => {
  const contributors = await loadContributors();
  await contributors.updateOne(
    {
      id: req.params.id
    },
    {
      $addToSet: {
        friends: req.query.friend
      }
    }
  );
  res.status(201).send(
    await contributors.findOne({
      id: req.params.id
    })
  );
});

// 4.4). PATCH - Update Contributor's likedTopics
router.patch("/liked-topics/:id", async (req, res) => {
  const contributors = await loadContributors();
  await contributors.updateOne(
    {
      id: req.params.id
    },
    {
      $addToSet: {
        likedTopics: req.query.topic
      }
    }
  );
  res.status(201).send(
    await contributors.findOne({
      id: req.params.id
    })
  );
});

// 4.5). PATCH - Update Contributor's Resources
router.patch("/resources/:id", async (req, res) => {
  const contributors = await loadContributors();
  await contributors.updateOne(
    {
      id: req.params.id
    },
    {
      $addToSet: {
        resourcesFollowed: req.query.resource
      }
    }
  );
  res.status(201).send(
    await contributors.findOne({
      id: req.params.id
    })
  );
});

// 5). DELETE - Remove Contributor Account by id
router.delete("/:id", async (req, res) => {
  const contributors = await loadContributors();
  await contributors.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

module.exports = router;
