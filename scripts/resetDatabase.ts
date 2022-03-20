import 'reflect-metadata';
import "./../di/loggerRegistry";
import "./../di/configRegistry";
import "./../di/templateRegistry";
import {container} from "tsyringe";
import {Storage} from "../services/sequelize";

const storage = container.resolve(Storage);

(async () => {
  await storage.instance.sync({
    force: true
  })
})();

console.log('Done!');

