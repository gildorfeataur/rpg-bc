const express = require("express");
const multer = require("multer");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://gildorfeataur:GildorFeataur12385@cluster0.hmifjgt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const app = express();
const jsonParser = express.json();

const gamesController = require("./games/controller");
const rulesController = require("./rules/controller");
const mastersController = require("./masters/controller");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}`));

(async () => {
  try {
    await client.connect();
    app.locals.games = client.db("rpg-bc").collection("games");
    app.locals.masters = client.db("rpg-bc").collection("masters");
    app.locals.rules = client.db("rpg-bc").collection("rules");
    app.listen(3000);
    console.log("Server working at port:3000");
  } catch (err) {
    return console.log(err);
  }
})();

// //GAMES
app.get("/api/games", jsonParser, gamesController.getGames);
app.post("/api/games", jsonParser, gamesController.addGame);
app.delete("/api/games/:id", gamesController.deleteGame);

//RULES
app.get("/api/rules", rulesController.getRules);

app.post(
  "/api/rules",
  multer({
    storage: rulesController.storageConfig,
    limits: {
      fileSize: 1024 * 1024,
      files: 1,
    },
  }).single("ruleImg"),
  jsonParser,
  rulesController.addRule
);

app.put(
  "/api/rules/:id",
  multer({
    storage: rulesController.storageConfig,
    limits: {
      fileSize: 1024 * 1024,
      files: 1,
    },
  }).single("ruleImg"),
  jsonParser,
  rulesController.changeRule
);

app.delete("/api/rules/:id", rulesController.deleteRule);

//MASTERS
app.get("/api/masters", mastersController.getMasters);

app.post(
  "/api/masters",
  multer({
    storage: mastersController.storageConfig,
    limits: {
      fileSize: 1024 * 1024,
      files: 1,
    },
  }).single("masterImg"),
  jsonParser,
  mastersController.addMaster
);

app.put(
  "/api/masters/:id",
  multer({
    storage: mastersController.storageConfig,
    limits: {
      fileSize: 1024 * 1024,
      files: 1,
    },
  }).single("userImg"),
  jsonParser,
  mastersController.changeMaster
);

app.delete("/api/masters/:id", mastersController.deleteMaster);

//CLOSE PROGRAM
process.on("SIGINT", async () => {
  await client.close();
  process.exit();
});