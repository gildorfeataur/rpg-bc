const multer = require("multer");
const objectId = require("mongodb").ObjectId;
const rulesFolder = "rules";

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
    photoPath: req.file ? `/${rulesFolder}/${req.file.originalname}` : "",
    description: req.body.description,
  };

  const collection = req.app.locals.rules;

  try {
    const result = await collection.insertOne(rule);
    if (result) {
      res.send(result);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.changeRule = async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const ruleLink = req.body.link;
  const ruleUaLink = req.body.ualink;
  const photoPath = req.file
    ? `/${rulesFolder}/${req.file.originalname}`
    : req.body.photoPath;
  const ruleDescription = req.body.description;

  const collection = req.app.locals.rules;
  try {
    const id = new objectId(req.params.id);
    const result = await collection.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          facebook: ruleLink ? ruleLink : null,
          instagram: ruleUaLink ? ruleUaLink : null,
          photoPath: photoPath ? photoPath : null,
          description: ruleDescription ? ruleDescription : null,
        },
      },
      { returnDocument: "after" }
    );

    if (result) res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

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
};

exports.storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `../frontend/public/${rulesFolder}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
