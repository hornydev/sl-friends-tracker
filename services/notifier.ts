import {inject, singleton} from "tsyringe";
import {Friend} from "../models/friend";
import * as Mustache from 'mustache';
import {Bot} from "./bot";

@singleton()
export class Notifier {
    private readonly channel: string;

    constructor(
        @inject('telegram-config') config: any,
        @inject(Bot) private bot: Bot,
        @inject("templates/friendlist.mustache") private readonly friendListTemplate: string
    ) {
        this.channel = config.channel;
    }

    async customNotification(custom: string) {
        return this.bot.telegram.sendMessage(this.channel, custom, {
            parse_mode: 'HTML'
        })
    }

    async notifyOnlineList(friends: Friend[], channel: number) {
        const rendered = Mustache.render(this.friendListTemplate, {
            friends: friends
        })

        return this.bot.telegram.sendMessage(channel, rendered, {
            parse_mode: 'HTML'
        })
    }

    async notifyOnline(friend: Friend) {
        return this.bot.telegram.sendMessage(this.channel, `🟢 <b>${friend.displayName}</b> (${friend.username}) is online!`, {
            parse_mode: 'HTML'
        })
    }

    async notifyOffline(friend: Friend) {
        return this.bot.telegram.sendMessage(this.channel, `🔴 <b>${friend.displayName}</b> (${friend.username}) is offline.`, {
            parse_mode: 'HTML'
        })
    }

}
