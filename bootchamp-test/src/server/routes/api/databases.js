const mongodb = require("mongodb");
module.exports = {
  loadContributors: async function loadContributors() {
    const client = await mongodb.MongoClient.connect(
      "mongodb://bootchampAdmin:adminBootchamp1@ds355357.mlab.com:55357/bootchamp",
      {
        useNewUrlParser: true
      }
    );
    return client.db("bootchamp").collection("contributors");
  },

  loadTopics: async function loadTopics() {
    const client = await mongodb.MongoClient.connect(
      "mongodb://bootchampAdmin:adminBootchamp1@ds355357.mlab.com:55357/bootchamp",
      {
        useNewUrlParser: true
      }
    );
    return client.db("bootchamp").collection("topics");
  },

  loadCities: async function loadCities() {
    const client = await mongodb.MongoClient.connect(
      "mongodb://bootchampAdmin:adminBootchamp1@ds355357.mlab.com:55357/bootchamp",
      {
        useNewUrlParser: true
      }
    );
    return client.db("bootchamp").collection("cities");
  },
  loadTags: async function loadTags() {
    const client = await mongodb.MongoClient.connect(
      "mongodb://bootchampAdmin:adminBootchamp1@ds355357.mlab.com:55357/bootchamp",
      {
        useNewUrlParser: true
      }
    );
    return client.db("bootchamp").collection("tags");
  },
  loadResources: async function loadResources() {
    const client = await mongodb.MongoClient.connect(
      "mongodb://bootchampAdmin:adminBootchamp1@ds355357.mlab.com:55357/bootchamp",
      {
        useNewUrlParser: true
      }
    );
    return client.db("bootchamp").collection("resources");
  },
  loadMeetups: async function loadMeetups() {
    const client = await mongodb.MongoClient.connect(
      "mongodb://bootchampAdmin:adminBootchamp1@ds355357.mlab.com:55357/bootchamp",
      {
        useNewUrlParser: true
      }
    );
    return client.db("bootchamp").collection("meetups");
  }
};
