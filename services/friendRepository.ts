import {FriendModel} from "../models/friend";
import {OnlineStatus} from "../models/enums";
import {singleton} from "tsyringe";
import {Op} from "sequelize";
import {FindOptions} from "sequelize/types/model";

@singleton()
export class FriendRepository {
    public async findOnline(excludeUsernames: string[] = []): Promise<FriendModel[]> {
        const query: FindOptions = {
            where: {
                status: OnlineStatus.ONLINE,
            },
            order: [['displayName', 'ASC']],
        };

        if (excludeUsernames.length > 0) {
            query.where['username'] = {[Op.notIn]: excludeUsernames};
        }

        return FriendModel.findAll(query);
    }
}
