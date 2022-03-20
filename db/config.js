const fs = require('fs');

const config = JSON.parse(fs.readFileSync(__dirname + "/../config.json").toString("utf-8"));

module.exports = {
    ...config.db
}