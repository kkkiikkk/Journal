import {  createUser, authUser, createProfile, updateUser, updateProfile, createGrade } from '../../api/v1/user';
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
  }
  
]
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJkZjRkMGIzLWNlYTQtNGIwNC1hNDllLTI1ZDYzY2IxOTI5MCIsImlkVXNlciI6ImRiMTRmZGExLWJhYTktNDMzYS05OGQzLTZjYjI4MzAzY2EzOSIsImlhdCI6MTY0MzMxMjY5NSwiZXhwIjoxNjQzMzIxNjk1fQ.Rkaa_XyBtUTzwDHMpDlF_jELyTo5R65Elo4_t36X-Kw