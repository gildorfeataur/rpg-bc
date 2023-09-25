const express = require("express");
const multer = require("multer");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");

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

//GAMES

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

//MASTERS

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

// app.post("/api/masters", jsonParser, async (req, res) => {
//   if (!req.body) return res.sendStatus(400);

//   const master = {
//     name: req.body.name,
//     telegram: req.body.telegram,
//     facebook: req.body.facebook,
//     instagram: req.body.instagram,
//     photoPath: req.body.photoPath,
//     description: req.body.description,
//   };

//   const collection = req.app.locals.masters;

//   try {
//     await collection.insertOne(master);
//     res.send(master);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

//files upload
app.use(multer({ storage: storageConfig }).single("avatar"));
app.post("/api/masters", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  console.log(req.file);
  console.log(req.body);

  const master = {
    name: req.body.name,
    telegram: req.body.telegram,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    photoPath: `/${req.file.destination}/${req.file.originalname}`,
    description: req.body.description,
  };

  const collection = req.app.locals.masters;

  try {
    await collection.insertOne(master);
    await res.send(master);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.put("/api/masters/:id", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const userTelegram = req.body.telegram;
  const userFacebook = req.body.facebook;
  const userInstagram = req.body.instagram;
  const userPhotoPath = req.body.photoPath;
  const userDescription = req.body.description;

  const collection = req.app.locals.masters;
  try {
    const id = new objectId(req.params.id);
    const result = await collection.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          telegram: userTelegram ? userTelegram : null,
          facebook: userFacebook ? userFacebook : null,
          instagram: userInstagram ? userInstagram : null,
          photoPath: userPhotoPath ? userPhotoPath : null,
          description: userDescription ? userDescription : null,
        },
      },
      { returnDocument: "after" }
    );

    const user = result;
    if (user) res.send(user);
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

//RULES

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

process.on("SIGINT", async () => {
  await mongoClient.close();
  console.log("Приложение завершило работу");
  process.exit();
});
