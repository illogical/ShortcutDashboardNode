var express = require("express");
var router = express.Router();
var fs = require("fs");
const path = require("path");

const StormDB = require("stormdb");
const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);

const configPath = "../settings/dashboardConfig.json";
const configName = 'configs';

/* GET  */
router.get("/", function (req, res, next) {
  if(db.get(configName).value() == undefined)
  {
    // TODO: load all .json files from a directory (to support templates)
    const file = fs.readFileSync(path.join(__dirname, configPath));
    const loadedConfig = JSON.parse(file);

    db.set(configName, []);
    db.get(configName).push({name: "Template", config: loadedConfig});
    db.save();
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
