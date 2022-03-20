import {BelongsTo, Column, DataType, ForeignKey, IsUUID, Model, PrimaryKey, Table} from 'sequelize-typescript'
import {FriendModel} from "./friend";
import {EventType} from "./enums";

export interface Event {
    id: String,
    date: Date,
    friendId: String,
    status: EventType
}

export interface EventCreationAttributes extends Event {
}

@Table({
    timestamps: true,
    underscored: true
})
export class EventModel extends Model<Event, EventCreationAttributes> implements Event {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id: String

    @Column
    date: Date;

    @Column({
        type: DataType.ENUM(...Object.values(EventType)),
        defaultValue: EventType.LOGGED_ON
    })
    status: EventType

    @ForeignKey(() => FriendModel)
    @Column({
        type: DataType.UUID
    })
    friendId: String

    @BelongsTo(() => FriendModel, 'friendId')
    user: FriendModel;
}
