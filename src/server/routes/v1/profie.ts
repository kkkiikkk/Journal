import { averageRaiting, averageRaitingFaculty, averageRaitingGroup, createGrade, getAverageGrade, listGradesLesson, updateGrade, updateProfile } from "../../api/v1/profile";
import { getGrade, grade, profile } from "../../schemes";

export default [
    {
        method: 'PUT',
        path: '/v1/profiles/{id}',
        options: {
          auth: 'jwt-access',
          id: 'v1.profiles.id.put',
          tags:['api', 'v1', 'profiles', 'id'], 
          validate: {
            payload: profile
          },
        },
        handler: updateProfile
      },
      {
        method: 'POST',
        path: '/v1/profiles/createGrade/{id}',
        options: {
          auth: 'jwt-access',
          id: 'v1.profiles.grade.id.post',
          tags:['api', 'v1', 'profiles', 'grade', 'id'], 
          validate: {
            payload: grade
          },
        },
        handler: createGrade
      },
      {
        method: 'PUT',
        path: '/v1/profiles/gradeUpdate/{gradeId}',
        options: {
          auth: 'jwt-access',
          id: 'v1.profiles.grade.update.id.put',
          tags: ['api', 'v1', 'profiles', 'grade', 'update'],
          validate: {
            payload: grade
          }
        },
        handler: updateGrade
      },
      {
        method: 'GET',
        path: '/v1/profiles/averageRaiting/{id}',
        options: {
          auth: 'jwt-access',
          id: 'v1.profiles.averageRaiting.id.get',
          tags: ['api', 'v1', 'profiles', 'averageRaiting', 'id']
        },
        handler: averageRaiting
      },
      {
        method: 'POST',
        path: '/v1/grades/averageFaculty',
        options: {
          auth: 'jwt-access',
          id: 'v1.profiles.averageFaculty.post',
          tags:['api', 'v1', 'profiles', 'averageFaculty'], 
          validate: {
            payload: profile
          },
        },
        handler: averageRaitingFaculty
      },
      {
        method: 'POST',
        path: '/v1/grades/averageGroup',
        options: {
          auth: 'jwt-access',
          id: 'v1.profiles.averageGroup.post',
          tags: ['api', 'v1', 'profiles', 'averageGroup'],
          validate: {
            payload: profile
          },
        },
        handler: averageRaitingGroup
      },
      {
        method: 'POST',
        path: '/v1/profiles/{id}/grades/averageGrade',
        options: {
          auth: 'jwt-access',
          id: 'v1.profiles.id.grades.averageGrade.post',
          tags: ['api', 'v1', 'profiles', 'grades', 'averageGrade'],
          validate: {
            payload: getGrade
          },
        },
        handler: getAverageGrade
      },
      {
        method: 'POST',
        path: '/v1/profiles/{id}/grades',
        options: {
          auth: 'jwt-access',
          id: 'v1.profiles.id.grades.post',
          tags: ['api', 'v1', 'profiles', 'grades'],
          validate: {
            payload: getGrade
          },
        },
        handler: listGradesLesson
      },
]

