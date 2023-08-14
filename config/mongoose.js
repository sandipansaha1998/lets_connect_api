const mongoose = require("mongoose");
const uri = `mongodb+srv://sandipandeveloper:Samya280199@cluster0.ucj81es.mongodb.net/lets_connect_api?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("You successfully connected to MongoDB!");
  } catch (e) {
    console.log("Connection to Mongo Failed");
    throw new Error("Mongo Connection");
  }
}
module.exports = run;
