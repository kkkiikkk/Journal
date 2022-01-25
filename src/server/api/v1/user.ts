import { User, } from '../../models/User';
import { UserAvatar, } from '../../models/UserAvatar';
import { error, output, saveImage, } from '../../utils';
import * as Boom from '@hapi/boom'
import { Session } from '../../models/Session';
import { generateJwt } from '../../utils/auth';

export async function getUser(r) {
  return output({ firstName: 'John', });
}

export const createUser = async (r) => {
  
  const {
    email,
    username,
    phone,
    sex
  } = r.payload

  const user = await User.findOne({
    where: {
      email
    }
  })

  if (!user) {

    await User.createUser(r.payload)

    return output({
      username: username, 
      email: email, 
      phone: phone, 
      sex: sex
    })

  }

  return Boom.badRequest('User already exists')
}

export const authUser = async (r) => {

  const { password, email } = r.payload

  const user = await User.scope('withPassword').findOne({
    where: {
      email
    }    
  })
   
  console.log(user)

  if (!user) {
    return Boom.notFound('User not found')
  }

  if(!user.passwordCompare(password)) {
    return Boom.badRequest('Invalid Password')
  }

  const createSession = await Session.newSession(user.id)

  const token = generateJwt(createSession)

  return {
    access: token.access
  }

}

