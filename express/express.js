const express = require("express");
const multer = require("multer");
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
const app = express();
const jsonParser = express.json();

const gamesController = require("./games/controller")
const rulesController = require("./rules/controller")
const mastersController = require("./masters/controller")

const usersPhotos = "public/avatars";
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, usersPhotos);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}`));
app.use(multer({ storage: storageConfig }).single("avatar"));

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
app.post("/api/rules", jsonParser, rulesController.addRule);
app.delete("/api/rules/:id", rulesController.deleteRule);

//MASTERS
app.get("/api/masters", mastersController.getMasters);
app.post("/api/masters", mastersController.addMaster);
app.put("/api/masters/:id", jsonParser, mastersController.changeMaster);
app.delete("/api/masters/:id", mastersController.deleteMaster);

process.on("SIGINT", async () => {
  await mongoClient.close();
  process.exit();
});
