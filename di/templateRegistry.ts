import {registry} from "tsyringe";

const fs = require('fs');

@registry(fs.readdirSync("templates").map(filename => {
    const key = `templates/${filename}`;
    return {token : key, useValue: fs.readFileSync(key).toString('utf-8')}
}))
export class TemplateRegistry {}
