var express = require("express");
var router = express.Router();
var ping = require("jjg-ping");

router.get("/device", function(req, res, next) {
  ping.system.ping("192.168.7.20", (latency, status) => {
    if (status) {
      res.status(200).send("PC is on");
    } else {
      res.status(401).send("PC is unreachable");
    }
  });
});

module.exports = router;
