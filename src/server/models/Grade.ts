import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';
import {Profile} from './Profile'

type GradeType = {
    teacherId: string,
    studentId: string,
    lesson: string,
    grade: number,
}


@Table({
    timestamps: false,
    tableName: 'Grade'
})

export class Grade extends Model {
    @Column({ primaryKey: true, type: DataType.STRING, defaultValue: () => getUUID(), })
    id: string;

    @ForeignKey(() => Profile)
    @Column({ type: DataType.STRING, allowNull: false })
    teacherId: string;

    @ForeignKey(() => Profile)
    @Column({ type: DataType.STRING, allowNull: false })
    studentId: string;

    @Column({ type: DataType.NUMBER, allowNull: false })
    grade: number;

    @Column({ type: DataType.STRING, allowNull: false })
    lesson: string;

    @BelongsTo(() => Profile)
    profile: Profile

    static createGrade = async function (grade: GradeType) {

        return await this.create(grade)

    }
}