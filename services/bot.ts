import {Telegraf} from "telegraf";
import {inject, singleton} from "tsyringe";

@singleton()
export class Bot extends Telegraf {
    constructor(@inject('telegram-config') config: any) {
        super(config.bot_token);
    }
}
