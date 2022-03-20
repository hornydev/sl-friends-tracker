import {Logger} from "winston";
import {inject, singleton} from "tsyringe";
import {FriendTracker} from "./services/friendTracker";
import {Bot} from "./services/bot";
import {Notifier} from "./services/notifier";
import {FriendRepository} from "./services/friendRepository";

@singleton()
export class Application {
    constructor(
        @inject("logger-app") private log: Logger,
        @inject(FriendTracker) private tracker: FriendTracker,
        @inject(Notifier) private notifier: Notifier,
        @inject(FriendRepository) private friendRepository: FriendRepository,
        @inject(Bot) private bot: Bot
    ) {
    }

    public async run() {
        setInterval(() => this.tracker.track(), 30000)

        this.bot.command('online_sl_friends', async (ctx) => {
            const online = await this.friendRepository.findOnline();

            await this.notifier.notifyOnlineList(online, ctx.message.chat.id);
        });

        return this.bot.launch();
    }

    public stop(signal?: string): void {
        this.bot.stop(signal)
    }
}
