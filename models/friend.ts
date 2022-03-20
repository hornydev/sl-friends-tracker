import {Column, DataType, IsUUID, Model, PrimaryKey, Table} from 'sequelize-typescript'
import {EventType, OnlineStatus} from "./enums";

export interface Friend {
  id: String
  username: String,
  displayName: String,
  status: OnlineStatus
}

export interface FriendCreationAttributes extends Friend {
}

@Table({
  timestamps: true,
  underscored: true
})
export class FriendModel extends Model<Friend, FriendCreationAttributes> implements Friend {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: String

  @Column
  username: String;

  @Column
  displayName: String;

  @Column({
    defaultValue: false
  })
  notificationsEnabled: boolean = false;

  @Column({
    type: DataType.ENUM(...Object.values(OnlineStatus)),
    defaultValue: OnlineStatus.ONLINE
  })
  status: OnlineStatus
}
