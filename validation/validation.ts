import Joi from 'joi'

//----User Validation-------------

export const UserValidInfo = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  email: Joi.string().email().max(200).required(),
  password: Joi.string().pattern(new RegExp('^[a-z0-9]{6,25}$')),
})

//-------Movie Validation---------------------

export const MovieValidInfo = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  kind: Joi.string().min(3).max(200).required(),
  release_date: Joi.number().integer().min(1900).max(2021),
  director: Joi.string().min(3).max(200).required(),
  rate: Joi.number().min(0).max(10),
})
