import {singleton} from "tsyringe";
import {EventModel} from "../models/event";
import {EventType} from "../models/enums";

@singleton()
export class FriendStatusResolver {
    async getLastEvent(friendId: string): Promise<EventModel> {
        return EventModel.findOne({
            where: {
                friendId: friendId
            },
            order: [['createdAt', 'DESC']]
        });
    }

    async getLastStatus(friendId: string): Promise<EventType> {
        const event = await this.getLastEvent(friendId);

        return event.status;
    }
}
