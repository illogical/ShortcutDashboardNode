var express = require("express");
var router = express.Router();
var keyStroker = require("../services/keyStroker.js");
var fs = require("fs");
const path = require("path");
const logger = require("../services/logger.js");

var cp = require("child_process");
const exe = require("path").normalize("./vendor/WinSendKeys/WinSendKeys.exe");
const windowName = "[ACTIVE]";

function combineCommand(keystroke) {
  return [exe, "-w", windowName, keystroke].join(" ");
}

function getSettings() {
  try {
    let rawdata = fs.readFileSync(
      path.join(__dirname, "../serverSettings.json")
    );
    return JSON.parse(rawdata);
  } catch (error) {
    throw new Error("Unable to read serverSettings.json");
  }
}

router.get("/keys/:keys", function (req, res, next) {
  if (!req.params.keys) {
    res.status(400).json({
      error:
        "You forgot to supply the keystrokes. Example of shift+ctrl+alt+f: http://localhost/sendKeys?keys=f&modifiers=asc",
    });
  }

  const receivedKeys = {
    keys: req.params.keys,
    modifiers: req.query.modifiers,
  };

  const keyStroke = keyStroker(receivedKeys);
  var winSendKeysCommand = combineCommand(keyStroke);

  cp.exec(winSendKeysCommand, function (err, stdout, stderr) {
    if (err) {
      res.status(400).json({ error: "Unable to press your keys." });
    } else {
      logger("Keystroke: " + keyStroke);
      res.json({ success: "YAY", receivedKeys, sentKeystroke: keyStroke });
    }
  });
});

router.post("/command", function (req, res, next) {
  const command = req.body.command;

  try {
    cp.exec(command);
    res.send(200);
  } catch (error) {
    logger("Command: " + command);
    res.status(400).json({
      error: "Error executing command.",
      exception: error,
    });
  }
});

router.post("/python", function (req, res, next) {
  const command = req.body.command;

  try {
    // save the command to this file
    const settings = getSettings();
    fs.writeFileSync(settings.pythonFilePath, command);

    const keyStroke = keyStroker(settings.pythonShortcut);
    var winSendKeysCommand = combineCommand(keyStroke);

    cp.exec(winSendKeysCommand, function (err, stdout, stderr) {
      if (err) {
        res
          .status(400)
          .json({ error: "Unable to execute python command via shortcut." });
      } else {
        logger("Python command: " + command);

        res.json({
          success: "Python succesfully saved",
          sentKeystroke: keyStroke,
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      error: error ? error : "Error writing to settings.json",
      exception: error,
    });
  }
});

module.exports = router;
