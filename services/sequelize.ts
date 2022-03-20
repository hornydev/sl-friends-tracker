import {Sequelize} from 'sequelize-typescript'
import {FriendModel} from "../models/friend";
import {Options} from "sequelize";
import {inject, singleton} from "tsyringe";
import {Logger} from "winston";
import {EventModel} from "../models/event";

@singleton()
export class Storage {
  public readonly instance: Sequelize;

  constructor(
      @inject("db-config") options: Options,
      @inject("logger-database") logger: Logger,
  ) {
    this.instance = new Sequelize({
      ...options,
      models: [FriendModel, EventModel],
      logging: (msg) => logger.info(msg),
    });
  }

  public async sync() {
    return this.instance.sync();
  }
}
