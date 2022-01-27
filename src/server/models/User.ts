import { Column, DataType, HasMany, Model, Scopes, Table } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { getUUID, } from '../utils';
import { Session } from './Session';
import { Profile } from './Profile';

/**
 * 
 * Structure of the User model table
 * 
 */
@Scopes(() => ({
  defaultScope: {
    attributes: {
      exclude: ['password'],
    },
  },
  withPassword: {
    attributes: {
      include: ['password'],
    },
  },
}))

@Table({
  timestamps: false,
  tableName: "Users"
})

export class User extends Model {
  @Column({ type: DataType.STRING, primaryKey: true, defaultValue: () => getUUID(), })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({type: DataType.STRING, allowNull: false, unique: true})
  email: string;

  @Column({
    type: DataType.STRING,
    set(value: string) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue('password', hash);
    },
    get() {
      return this.getDataValue('password');
    },
  })
  password: string;
  
  @Column({type: DataType.STRING, allowNull: false})
  phone: string;
  
  @Column({type: DataType.DATE, allowNull:false,})
  dateOfBirth: Date;

  @Column({type: DataType.STRING, allowNull: false, })
  sex: string;

  @HasMany(() => Session)
  session: Session[]

  @HasMany(() => Profile)
  profile: Profile

  async passwordCompare(pwd: string) {

    return bcrypt.compareSync(pwd, this.password);

  }

  static createUser = async function (user: User) {

    return await this.create(user)

  }
}