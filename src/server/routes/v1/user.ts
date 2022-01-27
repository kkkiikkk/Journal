import {  createUser, authUser } from '../../api/v1/user';
import {  user, userLogin} from '../../schemes';

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
]