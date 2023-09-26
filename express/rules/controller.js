exports.getRules = async (req, res) => {
  const collection = req.app.locals.rules;
  try {
    const rules = await collection.find({}).toArray();
    res.send(rules);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.addRule = async (req, res) => {
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
}

exports.deleteRule = async (req, res) => {
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
}