var fs = require("fs");
const path = require("path");

const configPath = "../settings/dashboardConfig.json";

function hydrateDb(db, entityName)
{
    // TODO: load all .json files from a directory (to support templates)
    const file = fs.readFileSync(path.join(__dirname, configPath));
    const loadedConfig = JSON.parse(file);

    db.set(entityName, []);
    db.get(entityName).push({name: "Template", config: loadedConfig});
    db.save();

    return loadedConfig;
}

module.exports = hydrateDb;