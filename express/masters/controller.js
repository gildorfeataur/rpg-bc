exports.getMasters = async (req, res) => {
  const collection = req.app.locals.masters;
  try {
    const masters = await collection.find({}).toArray();
    res.send(masters);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

exports.addMaster = async (req, res) => {
  if (!req.body) return res.sendStatus(400);

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
}

const objectId = require("mongodb").ObjectId;
exports.changeMaster = async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log(req.file);
  console.log(req.body);

  const userTelegram = req.body.telegram;
  const userFacebook = req.body.facebook;
  const userInstagram = req.body.instagram;
  const userPhotoPath = req.file
    ? `/${req.file.destination}/${req.file.originalname}`
    : req.body.photoPath;
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
}

exports.deleteMaster = async (req, res) => {
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
}