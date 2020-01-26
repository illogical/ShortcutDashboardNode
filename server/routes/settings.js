var express = require("express");
var router = express.Router();
var fs = require("fs");
const path = require("path");

/* GET home page. */
router.get("/", function(req, res, next) {
  const file = fs.readFileSync(path.resolve(__dirname, "../settings.json"));

  fs.readFile(file, (err, data) => {
    if (err) {
      res.status(400).json({
        error: "Error reading settings.json."
      });
    }

    res.json(file);
  });
});

router.put("/", function(req, res, next) {
  var settings = req.body.settings;

  fs.writeFile(
    "settings.json",
    JSON.stringify(settings),
    "utf8",
    (err, res) => {
      if (err) {
        res.status(400).json({
          error: "Error writing to settings.json."
        });
      }
      res.send(200);
    }
  );
});

module.exports = router;
