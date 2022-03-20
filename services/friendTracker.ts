import {inject, singleton} from "tsyringe";
import {Logger} from "winston";
import {FriendRequester} from "./friendRequester";
import {FriendStatusResolver} from "./FriendStatusResolver";
import {FriendRepository} from "./friendRepository";
import {FriendModel} from "../models/friend";
import {EventType, OnlineStatus} from "../models/enums";
import {EventModel} from "../models/event";
import {Notifier} from "./notifier";

@singleton()
export class FriendTracker {
    constructor(
        @inject("logger-app") private log: Logger,
        @inject(FriendRequester) private requester: FriendRequester,
        @inject(FriendStatusResolver) private statusResolver: FriendStatusResolver,
        @inject(FriendRepository) private friendRepository: FriendRepository,
        @inject(Notifier) private notifier: Notifier
    ) {
    }

    async track() {
        const friends = await this.requester.get();
        const onlineFriends = [];

        this.log.info('Loaded list of the online friends.', {
            friends: friends,
        })

        for(const friend of friends) {
            onlineFriends.push(friend.username);

            let stored = await FriendModel.findOne({
                where: { username: friend.username }
            });

            if (!stored) {
                stored = await FriendModel.create({
                    username: friend.username,
                    displayName: friend.displayName,
                    status: OnlineStatus.ONLINE
                });

                await stored.save();
                await this.logIn(stored)

                this.log.info('Saved new friend to the database.', {
                    friend: stored,
                })

                continue;
            }

            const status = await this.statusResolver.getLastStatus(stored.id.toString());

            if (status === EventType.LOGGED_OFF) {
                await this.logIn(stored)
            }
        }

        const friendsToLogOff = await this.friendRepository.findOnline(onlineFriends);

        this.log.info('Logging off friends.', {
            friends: friendsToLogOff,
        })

        await Promise.all(friendsToLogOff.map((f: FriendModel) => this.logOut(f)));
    }

    private async logIn(stored: FriendModel) {
        this.log.info('Friend logged in.', {
            friend: stored,
        })

        stored.status = OnlineStatus.ONLINE;

        const event = await EventModel.create({
            date: new Date(),
            friendId: stored.id,
            status: EventType.LOGGED_ON,
        });

        await Promise.all([
            event.save(),
            stored.save(),
        ]);

        if (stored.notificationsEnabled) {
            await this.notifier.notifyOnline(stored);
        }
    }

    private async logOut(stored: FriendModel) {
        this.log.info('Friend logged off.', {
            friend: stored,
        })

        stored.status = OnlineStatus.OFFLINE;

        const event = await EventModel.create({
            date: new Date(),
            friendId: stored.id,
            status: EventType.LOGGED_OFF,
        });

        await Promise.all([
            event.save(),
            stored.save(),
        ]);

        if (stored.notificationsEnabled) {
            await this.notifier.notifyOffline(stored);
        }
    }
}
