const express = require("express");
const multer = require("multer");
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
const app = express();
const jsonParser = express.json();

const gamesController = require("./games/controller");
const rulesController = require("./rules/controller");
const mastersController = require("./masters/controller");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}`));

// app.use(
//   multer({
//     storage: mastersController.storageConfig,
//     limits: {
//       fileSize: 1024 * 1024,
//       files: 1,
//     },
//   }).single("userImg")
// );
// app.use(
//   multer({
//     storage: rulesController.storageConfig,
//     limits: {
//       fileSize: 1024 * 1024,
//       files: 1,
//     },
//   }).single("ruleImg")
// );

(async () => {
  try {
    await mongoClient.connect();
    app.locals.games = mongoClient.db("rpg-bc").collection("games");
    app.locals.masters = mongoClient.db("rpg-bc").collection("masters");
    app.locals.rules = mongoClient.db("rpg-bc").collection("rules");
    app.listen(3000);
    console.log("Server working...");
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
  }).single("userImg"),
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
  await mongoClient.close();
  process.exit();
});
