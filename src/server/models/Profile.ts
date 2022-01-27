import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { University } from './University';
import { User } from './User';

type ProfileType = {
    userId: string,
    universityId: string,
    faculty: string,
    university: string,
    group: string,
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

    @Column({ type: DataType.STRING, allowNull: false, defaultValue:function (group: string) {
        return group ? 'student' : 'teacher'
    }})
    type: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => University)
    univers: University;

    static createProfile = async function (profile: ProfileType) {

        return await this.create({
            userId: profile.userId,
            universityId: profile.universityId,
            faculty: profile.faculty,
            university: profile.university,
            group: profile.group,
        })

    }
}