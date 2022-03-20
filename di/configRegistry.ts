import {registry} from "tsyringe";

const fs = require('fs');
const configJson = fs.readFileSync('config.json');
const config = JSON.parse(configJson);

@registry([
    { token: 'db-config' , useValue: config.db },
    { token: 'telegram-config' , useValue: config.telegram },
    { token: 'friends-api-config', useValue: config.friends_api }
])
export class ConfigRegistry {}
