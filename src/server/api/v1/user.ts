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

  const token = generateJwt(createSession.dataValues)

  return {
    access: token.access
  }

}

export const createProfile = async (r) => {

  const {group, university, faculty} = r.payload

  const findUniversity = await University.findOne({
    where: {
      name: r.payload.university
    }
  })

  if (!findUniversity) {
    return error(Errors.NotFound, 'Not Found University', {})
  }

  const profile = await Profile.findOne({
    where:{
      userId: r.auth.credentials.id,
      universityId: findUniversity.id,
    }
  })

  if (!profile) {
    const profileCreate = await Profile.createProfile({university, faculty, group,
      userId: r.auth.credentials.id,
      universityId: findUniversity.id,
      type: group ? 'student' : 'teacher' 
    })



    return output(profileCreate)
  }

  return error(Errors.InvalidPayload, 'Profile already exists', {})
}

export const updateUser = async (r) => {

  const user = await User.findOne({
    where: {
      id: r.auth.credentials.id
    }
  })

  user.update(r.payload)

  await user.save()

  return output(user)
}

export const updateProfile = async (r) => {

  const profile = await Profile.findOne({
    where: {
      id: r.params.id,
      type: 'student'
    }
  })

  if(!profile) {
    return error(Errors.NotFound, 'Profile not found', {})
  }

  const teacher = await Profile.findOne({
    where: {
      userId: r.auth.credentials.id,
      type: 'teacher',
      university: profile.university
    }
  })

  if(!teacher) {
    return error(Errors.NotFound, 'You not teacher', {})
  }
  
  await profile.update(r.payload)

  return output(profile)
  
}