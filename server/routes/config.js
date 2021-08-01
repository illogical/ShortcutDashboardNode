var express = require('express');
var router = express.Router();

var configSvc = require('../services/configDb.js');

/* GET  */
router.get('/', function (req, res, next) {
    res.json(configSvc.getConfig());
});

router.post('/', function (req, res, next) {
    var config = req.body.config;

    try {
        // fs.writeFileSync(path.join(__dirname, configPath), JSON.stringify(config));
        configSvc.saveConfig(config);

        res.sendStatus(200);
    } catch (error) {
        res.status(400).json({
            error: 'Error writing to settings.json',
            exception: error,
        });
    }
});

module.exports = router;
