import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { Grade } from './Grade';
import { University } from './University';
import { User } from './User';

type ProfileType = {
    userId: string,
    universityId: string,
    faculty: string,
    university: string,
    group: string,
    type: string
}


@Table({
    timestamps: false,
    tableName: 'Profile'
})

export class Profile extends Model {
    @Column({ primaryKey: true, type: DataType.STRING, defaultValue: () => getUUID(), })
    id: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false })
    userId: string;

    @ForeignKey(() => University)
    @Column({type: DataType.STRING, allowNull: false})
    universityId: string

    @Column({ type: DataType.STRING, allowNull: false })
    faculty: string;

    @Column({ type: DataType.STRING, allowNull: false })
    university: string;

    @Column({ type: DataType.STRING })
    group: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    type: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => University)
    univers: University;

    @HasMany(() => Grade)
    grades: Grade[]

    static createProfile = async function (profile: ProfileType) {

        return await this.create(profile)

    }
}