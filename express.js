const express = require("express");
// var bodyParser = require('body-parser');
// var fileUpload = require("express-fileupload");
const multer = require("multer");
const upload = multer({ dest: "./public" });
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}`));

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

app.get("/api/games", async (req, res) => {
  const collection = req.app.locals.games;
  try {
    const users = await collection.find({}).toArray();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/api/masters", async (req, res) => {
  const collection = req.app.locals.masters;
  try {
    const masters = await collection.find({}).toArray();
    res.send(masters);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/api/rules", async (req, res) => {
  const collection = req.app.locals.rules;
  try {
    const rules = await collection.find({}).toArray();
    res.send(rules);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// app.get("/api/games/:id", async (req, res) => {
//   const collection = req.app.locals.games;
//   try {
//     const id = new objectId(req.params.id);
//     const game = await collection.findOne({ _id: id });
//     if (game) res.send(game);
//     else res.sendStatus(404);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

app.post("/api/games", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const game = {
    title: req.body.title,
    date: req.body.date,
    type: req.body.type,
    rules: req.body.rules,
    master: req.body.master,
    description: req.body.description,
    minPlayersCount: req.body.minPlayersCount,
    maxPlayersCount: req.body.maxPlayersCount,
    cost: req.body.cost,
    place: req.body.place,
  };

  const collection = req.app.locals.games;

  try {
    await collection.insertOne(game);
    res.send(game);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/api/masters", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const master = {
    name: req.body.name,
    description: req.body.description,
    telegram: req.body.telegram,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
  };

  const collection = req.app.locals.masters;

  try {
    await collection.insertOne(master);
    res.send(master);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/api/upload", upload.single("uploaded_file"), async (req, res) => {
  console.log(req.file);
  try {
    await res.send(req.file)
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/api/rules", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const rule = {
    title: req.body.title,
    link: req.body.link,
    ualink: req.body.ualink,
    description: req.body.description,
  };

  const collection = req.app.locals.rules;

  try {
    await collection.insertOne(rule);
    res.send(rule);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/api/games/:id", async (req, res) => {
  const collection = req.app.locals.games;
  try {
    const id = new objectId(req.params.id);
    const result = await collection.findOneAndDelete({ _id: id });
    if (result) res.send(result);
    else res.sendStatus(404);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/api/masters/:id", async (req, res) => {
  const collection = req.app.locals.masters;
  try {
    const id = new objectId(req.params.id);
    const result = await collection.findOneAndDelete({ _id: id });
    if (result) res.send(result);
    else res.sendStatus(404);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/api/rules/:id", async (req, res) => {
  const collection = req.app.locals.rules;
  try {
    const id = new objectId(req.params.id);
    const result = await collection.findOneAndDelete({ _id: id });
    if (result) res.send(result);
    else res.sendStatus(404);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// app.put("/api/games", jsonParser, async (req, res) => {
//   if (!req.body) return res.sendStatus(400);
//   const userName = req.body.name;
//   const userAge = req.body.age;

//   const collection = req.app.locals.games;
//   try {
//     const id = new objectId(req.body.id);
//     const result = await collection.findOneAndUpdate(
//       { _id: id },
//       { $set: { age: userAge, name: userName } },
//       { returnDocument: "after" }
//     );

//     const game = result.value;
//     if (game) res.send(game);
//     else res.sendStatus(404);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

process.on("SIGINT", async () => {
  await mongoClient.close();
  console.log("Приложение завершило работу");
  process.exit();
});
