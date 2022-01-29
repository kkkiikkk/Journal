import { Grade } from '../../models/Grade';
import { col, fn } from 'sequelize';
import { Errors } from '../../utils/errors'
import { Profile } from '../../models/Profile';
import { output, error } from '../../utils';

export const updateProfile = async (r) => {

    const profile = await Profile.findOne({
        where: {
            id: r.params.id
        }
    })

    if (!profile) {
        return error(Errors.NotFound, 'Profile not found', {})
    }

    const teacher = await Profile.findOne({
        where: {
            userId: r.auth.credentials.id,
            type: 'teacher',
            university: profile.university
        }
    })

    if (!teacher) {
        return error(Errors.NotFound, 'You not teacher', {})
    }

    if (teacher.university === profile.university) {

        profile.update(r.payload)

        profile.save()

        return output(profile)
    }

    return error(Errors.InvalidPayload, 'Other university', {})
}

export const createGrade = async (r) => {

    const { grade, lesson } = r.payload

    const profile = await Profile.findOne({
        where: {
            id: r.params.id
        }
    })

    if (!profile) {
        return error(Errors.NotFound, 'Profile not found', {})
    }

    const teacher = await Profile.findOne({
        where: {
            userId: r.auth.credentials.id,
            type: 'teacher',
            university: profile.university
        }
    })

    if (!teacher) {
        return error(Errors.NotFound, 'You not teacher', {})
    }

    const isUniversity = teacher.university === profile.university
    const isFaculty = teacher.faculty === profile.faculty

    if (isUniversity && isFaculty) {
        const gradeCreated = await Grade.createGrade({
            grade, lesson,
            teacherId: teacher.id,
            studentId: profile.id
        })

        return output(gradeCreated)
    }

    return error(Errors.NotFound, 'Other faculty or university', {})

}

export const updateGrade = async (r) => {

    const grade = await Grade.findOne({
        where: {
            id: r.params.gradeId
        }
    })

    if (!grade) {
        return error(Errors.NotFound, 'Not Found Grade', {})
    }

    const teacher = await Profile.findOne({
        where: {
            userId: r.auth.credentials.id,
            id: grade.teacherId,
        }
    })

    if (!teacher) {
        return error(Errors.NotFound, 'You not teacher', {})
    }

    grade.update(r.payload)

    return output(grade)


}

export const averageRaiting = async (r) => {

    const profile = await Profile.findOne({
        where: {
            id: r.params.id
        }
    })

    if (!profile) {
        return error(Errors.NotFound, 'Profile not Found', {})
    }

    const userProfile = await Profile.findOne({
        where: {
            userId: r.auth.credentials.id,
            university: profile.university,
            faculty: profile.faculty
        }
    })

    if (!userProfile) {
        return error(Errors.NotFound, 'Profie Not Found', {})
    }

    const grades = await Grade.findAll({
        where: {
            studentId: r.params.id
        }
    })

    let sum = 0

    grades.map(grade => sum = + grade.grade)

    return output({ average: sum / grades.length })
}

export const averageRaitingFaculty = async (r) => {

    const teacher = await Profile.findOne({
        where: {
            type: 'teacher',
            faculty: r.payload.faculty,
            userId: r.auth.credentials.id,
            university: r.payload.university
        }
    })

    if (!teacher) {
        return error(Errors.NotFound, 'You not teacher', {})
    }

    const grades = await Grade.findAll({
        where: {
            teacherId: teacher.id
        },
        attributes: [
            [fn('AVG', col('grade')), 'avgRating'],
        ]
    })

    if (!grades) {
        return error(Errors.NotFound, 'Havent grades', {})
    }



    return output(grades)

}

export const averageRaitingGroup = async (r) => {

    const { university, group, faculty } = r.payload

    const teacher = await Profile.findOne({
        where: {
            type: 'teacher',
            faculty: r.payload.faculty,
            userId: r.auth.credentials.id,
            university: r.payload.university
        }
    })

    if (!teacher) {
        return error(Errors.NotFound, 'You not teacher', {})
    }
    console.log(1)

    const profiles = await Profile.findAll({
        where: {
            university: university,
            group: group,
            faculty: faculty,
            type: 'student'
        },
        include: {
            model: Grade,
            where: {
                teacherId: teacher.id
            }
        },
    })

    let sum = 0
    let length = 0

    profiles.map((profile) => {
        profile.grades.map(grade => (sum = + grade.grade, length++))
    })

    return output({ averageGroup: sum / length })
}

export const getAverageGrade = async (r) => {

    const {lesson} = r.payload

    const student = await Profile.findOne({
        where: {
            id: r.params.id,
            userId: r.auth.credentials.id,
            type: 'student'
        }
    })
    
    if (!student) {
        error(Errors.NotFound, 'You not student', {})
    }
    
    const grades =  await Grade.findAll({
        where: {
            studentId: student.id,
            lesson: lesson
        },
        attributes: [
            [fn('AVG', col('grade')), 'avgRating'],
        ]
    })

    if (!grades) {
       return error(Errors.InvalidPayload, 'Invalid Payload', {})
    }

    return output(grades)
}