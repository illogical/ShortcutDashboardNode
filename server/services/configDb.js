const StormDB = require('stormdb');
const engine = new StormDB.localFileEngine('./server/db/db.stormdb');
const db = new StormDB(engine);

const hydrateDb = require('../db/hydrateDb.js');
const configName = 'configs';

const configService = {
    getConfig() {
        if (db.get(configName).value() == undefined) {
            hydrateDb(db, configName);
        }

        const config = db.get(configName).get(0).get('config');
        console.log('db config', config);

        return config.value();
    },

    saveConfig(config) {
        db.get(configName).get(0).set('config', config).save();
    },
};

module.exports = configService;
