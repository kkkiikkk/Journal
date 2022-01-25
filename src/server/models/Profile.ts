import { BelongsTo, Column, DataType, ForeignKey, Model, Table, Unique } from 'sequelize-typescript';
import { QueryInterface } from 'sequelize/dist';
import { getUUID } from '../utils';
import { User } from './User';

type ProfileType = {
    userId: string,
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

    @Column({ type: DataType.STRING, allowNull: false })
    faculty: string;

    @Column({ type: DataType.STRING, allowNull: false })
    university: string;

    @Column({ type: DataType.STRING })
    group: string;

    @Column({ type: DataType.STRING, allowNull: false })
    type: string;

    @BelongsTo(() => User)
    user: User;


    static createProfile = async function (profile: ProfileType) {

        const id = getUUID();
        await this.create({
            userId: profile.userId,
            faculty: profile.faculty,
            university: profile.university,
            group: profile.group,
            type: profile.type
        })
    }
}