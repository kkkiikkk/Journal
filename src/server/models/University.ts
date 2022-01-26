import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { User } from './User';

type ProfileType = {
    name: string,
    userId:string,
}

@Table({
    timestamps: false,
    tableName: 'University'
})

export class University extends Model {
    @Column({ primaryKey: true, type: DataType.STRING, defaultValue: () => getUUID(), })
    id: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false })
    userId: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;


    @BelongsTo(() => User)
    user: User;

    
    static createProfileUniversity = async function (profile: ProfileType) {

        const id = getUUID();
        await this.create({
            name: profile.name,
            userId: profile.userId
        })
    }
}