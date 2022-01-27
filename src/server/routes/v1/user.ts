import {  createUser, authUser, createProfile, updateUser, updateProfile } from '../../api/v1/user';
import {  profile, user, userLogin, userUpdate} from '../../schemes';

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
  }
  
]