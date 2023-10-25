//GAMES

exports.getGames = async (req, res) => {
  const collection = req.app.locals.games;
  try {
    const users = await collection.find({}).toArray();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

exports.addGame = async (req, res) => {
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
}

exports.deleteGame = async (req, res) => {
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
}
