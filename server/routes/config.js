var express = require("express");
var router = express.Router();

const StormDB = require("stormdb");
const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);

const hydrateDb = require('../db/hydrateDb.js');
const configName = 'configs';

/* GET  */
router.get("/", function (req, res, next) {
  if(db.get(configName).value() == undefined)
  {
    hydrateDb(db, configName);
  }

  const config = db.get(configName).get(0).get('config');
  console.log("db config", config);
  res.json(config.value());
});

router.post("/", function (req, res, next) {
  var config = req.body.config;

  try {
    // fs.writeFileSync(path.join(__dirname, configPath), JSON.stringify(config));
    db.get(configName).get(0).set('config', config).save();
  
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({
      error: "Error writing to settings.json",
      exception: error,
    });
  }
});

module.exports = router;
