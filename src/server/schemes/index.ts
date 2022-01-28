import * as Joi from 'joi';

export const outputOkSchema = (res: Joi.Schema): Joi.Schema => Joi.object({
  ok: Joi.boolean().example(true),
  result: res,
});


const email = Joi.string().email()
const password = Joi.string().min(6).max(24)
const username = Joi.string()
const phone = Joi.string().regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
const dateOfBirth = Joi.date().raw()
const sex = Joi.string().valid('male', 'female')

export const user = Joi.object({
  username: username
    .required(),
  email: email
    .required(),
  password: password
    .required(),
    
  phone: phone
    .required(),
  dateOfBirth: dateOfBirth
    .required(),
  sex: sex
    .required()
})

export const userLogin = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .max(24)    
    .required()  
})

export const profile = Joi.object({
  faculty: Joi.string()
    .required(),
  university: Joi.string() 
    .valid('ЗГИА', 'ЗНТУ', 'ЗНУ')
    .required(),
  group: Joi.string(),
  
})

export const userUpdate = Joi.object({
  username: username,
  password: password,
  phone: phone,
  dateOfBirth: dateOfBirth,
  sex: sex
})