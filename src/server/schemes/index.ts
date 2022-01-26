import * as Joi from 'joi';

export const outputOkSchema = (res: Joi.Schema): Joi.Schema => Joi.object({
  ok: Joi.boolean().example(true),
  result: res,
});


export const user = Joi.object({
  username: Joi.string(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .max(24)
    .required(),
  phone: Joi.string()
    .regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
    .required(),
  dateOfBirth: Joi.date()
    .raw()
    .required(),
  sex: Joi.string()
    .valid('male', 'female')
    .required()
});

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
