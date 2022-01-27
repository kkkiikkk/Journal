import {  
  createUser, 
  authUser, 
  createProfile, 
  updateUser, 
  updateProfile, 
  createGrade, 
  updateGrade, 
  averageRaiting, 
  averageRaitingFaculty
} from '../../api/v1/user';
import {  grade, profile, user, userLogin, userUpdate} from '../../schemes';

export default [
  {
    method: 'POST',
    path: '/v1/register',
    options: {
      auth: false,
      id: 'v1.register.post',
      tags: ['api', 'v1', 'register'],
      validate: {
        payload: user
      }
    },
    handler: createUser
  },
  {
    method: 'POST',
    path: '/v1/login',
    options: {
      auth: false,
      id: 'v1.login.post',
      tags: ['api', 'v1', 'login'],
      validate: {
        payload: userLogin
      }
    },
    handler: authUser
  },
  {
    method: 'POST',
    path: '/v1/user/createProfile',
    options: {
      auth: 'jwt-access',
      id:'v1.create.profile',
      tags:['api', 'v1', 'user', 'createProfile'],
      validate: {
        payload: profile
      }
    },
    handler: createProfile
  },
  {
    method: 'PUT',
    path: '/v1/updateUser',
    options: {
      auth: 'jwt-access',
      id: 'v1.updateUser.post',
      tags:['api', 'v1', 'updateUser'],
      validate: {
        payload: userUpdate
      }
    },
    handler: updateUser
  },
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
    path: '/v1/profiles/averageFaculty',
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
  
]
