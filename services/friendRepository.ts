import {FriendModel} from "../models/friend";
import {OnlineStatus} from "../models/enums";
import {singleton} from "tsyringe";
import {Op} from "sequelize";

@singleton()
export class FriendRepository {
    public async findOnline(excludeUsernames: string[] = []): Promise<FriendModel[]> {
        const query = excludeUsernames.length > 0 ? {
            where: {
                status: OnlineStatus.ONLINE,
                username: {[Op.notIn]: excludeUsernames}
            }
        } : {
            where: {
                status: OnlineStatus.ONLINE,
            }
        };

        return FriendModel.findAll(query);
    }
}
