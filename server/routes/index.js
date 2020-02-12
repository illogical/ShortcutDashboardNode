var express = require("express");
const path = require("path");

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

router.get("/api", function(req, res, next) {
  res.send("API should be running.");
});

module.exports = router;
