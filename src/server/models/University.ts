import {  Column, DataType, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';



@Table({
    timestamps: false,
    tableName: 'University'
})

export class University extends Model {
    @Column({ primaryKey: true, type: DataType.STRING, defaultValue: () => getUUID(), })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    
    static createUniversity = async function (university: string) {

        return await this.create({
            name: university,
        })
    }
}