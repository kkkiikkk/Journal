import { User, } from '../../models/User';
import { UserAvatar, } from '../../models/UserAvatar';
import { error, output, saveImage, } from '../../utils';
import * as Boom from '@hapi/boom'
import { Session } from '../../models/Session';
import { generateJwt } from '../../utils/auth';
import { Profile } from '../../models/Profile';
import { University } from '../../models/University';

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

export const createProfile = async (r) => {

  const {id} = r.auth.credentials

  const { university, faculty } = r.payload

  const profile = await Profile.findOne({
    where: {
      userId: id,
      university: university,
      type: r.payload.group ? 'student' : 'teacher' 
    }
  })

  if (!profile) {

    const univers = await University.findOne({
      where: {
        name: university,
        userId: id
      }
    })
    
    if (!univers) {
      await University.createProfileUniversity({
        name: university,
        userId: id
      })
    }else {
      return Boom.badRequest('Profile already exists')
    }

    await Profile.createProfile({
      userId: id,
      faculty: faculty,
      group: r.payload.group, 
      university: university,
      type: r.payload.group ? 'student' : 'teacher'
    })
    
    return output({
      faculty: faculty,
      group: r.payload.group,
      university: university,
    })
  }

  return Boom.badRequest('Profile already exists')
}

export const updateUser = async (r) => {

  const { id } = r.auth.credentials

  const user = await User.findOne({
    where: {
      id: id
    }
  })

  user.set({
    username: r.payload.username,
    password: r.payload.password,
    phone: r.payload.phone,
    dateOfBirth: r.payload.dateOfBirth,
    sex: r.payload.sex
  })

  await user.save()

  return output({
    username: r.payload.username,
    password: r.payload.password,
    phone: r.payload.phone,
    dateOfBirth: r.payload.dateOfBirth,
    sex: r.payload.sex
  })

}