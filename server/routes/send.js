var express = require("express");
var router = express.Router();
var keyStroker = require("../services/keyStroker.js");
var fs = require("fs");

var cp = require("child_process");
const exe = require("path").normalize("./vendor/WinSendKeys/WinSendKeys.exe");

router.get("/keys/:keys", function(req, res, next) {
  const windowName = "[ACTIVE]";

  if (!req.params.keys) {
    res.status(400).json({
      error:
        "You forgot to supply the keystrokes. Example of shift+ctrl+alt+f: http://localhost/sendKeys?keys=f&modifiers=asc"
    });
  }

  const receivedKeys = {
    keys: req.params.keys,
    modifiers: req.query.modifiers
  };

  const keyStroke = keyStroker(receivedKeys);
  var winSendKeysCommand = [exe, "-w", windowName, keyStroke].join(" ");

  cp.exec(winSendKeysCommand, function(err, stdout, stderr) {
    if (err) {
      res.status(400).json({ error: "Unable to press your keys." });
    } else {
      res.json({ success: "YAY", receivedKeys, sentKeystroke: keyStroke });
    }
  });
});

router.post("/command", function(req, res, next) {
  const command = req.body.command;

  res.json({ success: "YAY", command });

  try {
    fs.writeFileSync("S:\\Graphics\\Scripts\\ShortcutDashboard.py", command);
    res.send(200);
  } catch (error) {
    res.status(400).json({
      error: "Error writing to settings.json",
      exception: error
    });
  }
});

module.exports = router;
