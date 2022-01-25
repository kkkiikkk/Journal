import { request } from 'http';
import * as Joi from 'joi';
import { options } from 'joi';
import {  createUser, getUser, authUser, } from '../../api/v1/user';
import config from '../../config/config';
import { outputOkSchema, user, userLogin, userUpdate} from '../../schemes';

export default [
  {
    method: 'GET',
    path: '/v1/user',
    handler: getUser,
    options: {
      auth: 'jwt-access',
      // id: 'v1.user.get',
      // tags: ['api', 'v1', 'user'],
      // response: {
        // schema: outputOkSchema(
          // Joi.object({
            // firstName: Joi.string().example('John'),
          // })
        // ),
      // },
    },
  },
  {
    method: 'GET',
    path: '/v1/test',
    config: {
      auth: 'jwt-access'
    },
    handler: (request, h) => {
      return 'Hello'
    }
  },
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
  
];
