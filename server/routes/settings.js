var express = require("express");
var router = express.Router();
var fs = require("fs");
var settingsJson = require("../settings.json");

/* GET  */
router.get("/", function(req, res, next) {
  res.json(settingsJson);
});

router.put("/", function(req, res, next) {
  var settings = req.body.settings;

  try {
    fs.writeFileSync("settings.json", JSON.stringify(settings));

    res.send(200);
  } catch (error) {
    res.status(400).json({
      error: "Error writing to settings.json",
      exception: error
    });
  }
});

module.exports = router;
