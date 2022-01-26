import { User, } from '../../models/User';
import {  output, error} from '../../utils';
import * as Boom from '@hapi/boom'
import { Session } from '../../models/Session';
import { generateJwt } from '../../utils/auth';
import {Errors} from '../../utils/errors'
import { University } from '../../models/University';
import { Profile } from '../../models/Profile';


export const createUser = async (r) => {
  

  const user = await User.findOne({
    where: {
      email: r.payload.email
    }
  })

  if (!user) {

    await User.createUser(r.payload)

    return output({
      username: r.payload.username, 
      email: r.payload.email, 
      phone: r.payload.phone, 
      sex: r.payload.sex
    })

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

  const token = generateJwt(createSession.dataValues)

  return {
    access: token.access
  }

}

export const createProfile = async (r) => {

  const university = await University.findOne({
    where: {
      name: r.payload.university
    }
  })

  

  if (!university) {
    error(Errors.NotFound, 'Not Found University', {})
  }

  const profile = await Profile.findOne({
    where:{
      userId: r.auth.credentials.id,
      universityId: university.id,
    }
  })

  if (!profile) {
    const profileCreate = await Profile.createProfile({
      userId: r.auth.credentials.id,
      universityId: university.id,
      faculty: r.payload.faculty,
      university: r.payload.university,
      group: r.payload.group,
      type: r.payload.group ? 'student' : 'teacher'
    })

    return output(profileCreate.dataValues)
  }

  return error(Errors.InvalidPayload, 'Profile already exists', {})
}
