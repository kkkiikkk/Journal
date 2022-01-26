import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { User } from './User';
/**
 * 
 * Structure of the Session model table
 * /
 */
@Table({
  timestamps: false,
  tableName: "Session"
})

export class Session extends Model {
  @Column({ primaryKey: true, type: DataType.STRING, defaultValue: () => getUUID(), })
  id: string;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  idUser: string;

  @BelongsTo(() => User)
  user: User;

  static newSession = async function (idUser: string) {

    const id = getUUID();
    const session = await this.create({ id, idUser });

    return session.dataValues;
  }

}