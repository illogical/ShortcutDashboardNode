var express = require("express");
var router = express.Router();
var fs = require("fs");
var settingsJson = require("../settings/buttonConfig.json");
const path = require("path");

/* GET  */
router.get("/", function (req, res, next) {
  res.json(settingsJson);
});

router.post("/", function (req, res, next) {
  var config = req.body.config;

  try {
    fs.writeFileSync(
      path.join(__dirname, "../settings", "test.json"),
      JSON.stringify(config)
    );

    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({
      error: "Error writing to settings.json",
      exception: error,
    });
  }
});

module.exports = router;
