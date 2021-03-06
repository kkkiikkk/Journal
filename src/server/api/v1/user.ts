import { User, } from '../../models/User';
import {  output, error} from '../../utils';
import * as Boom from '@hapi/boom'
import { Session } from '../../models/Session';
import { generateJwt } from '../../utils/auth';
import {Errors} from '../../utils/errors'


export const createUser = async (r) => {
  

  const user = await User.findOne({
    where: {
      email: r.payload.email
    }
  })

  if (!user) {

    const userCreated = await User.createUser(r.payload)

    return output(userCreated)

  }

  return error(Errors.InvalidPayload, 'User already exists', {})
}

export const authUser = async (r) => {

  const user = await User.scope('withPassword').findOne({
    where: {
      email: r.payload.email
    }    
  })
   

  if (!user) {
    return error(Errors.NotFound, 'User Not Found', {})

  }

  if(!user.passwordCompare(r.payload.password)) {
    return error(Errors.InvalidPayload, 'Password Invalid', {})

  }

  const createSession = await Session.newSession(user.id)

  const token = generateJwt(createSession)

  return {
    access: token.access
  }

}