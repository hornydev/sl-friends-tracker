import {inject, singleton} from "tsyringe";
import {SLFriend} from "../models/dto/SLFriend";
import {Notifier} from "./notifier";
import {Logger} from "winston";
const axios = require('axios');

@singleton()
export class FriendRequester {
    constructor(
        @inject("friends-api-config") private config: any,
        @inject("logger-app") private log: Logger,
        @inject(Notifier) private notifier: Notifier
    ) {
        this.config = config;
    }

    async get(): Promise<SLFriend[]> {
        try {
            const response = await axios({
                method: 'get',
                url: this.config.url,
                auth: {
                    username: this.config.username,
                    password: this.config.password
                }
            });

            return response.data.friends;
        } catch (e) {
            this.log.error('Error happened during loading online friends list', {
                error: e,
                message: e.message
            });

            return [];
        }
    }
}
