import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import mongoose from 'mongoose'
import { UserInterface } from '../interfaces/UserInterface'
import { UserValidInfo } from '../validation/validation'
require('dotenv').config()

// Create User
export const createUser = async (req: Request, res: Response) => {
  const _id = mongoose.Types.ObjectId()
  const name: string = req.body.name
  const email: string = req.body.email
  const password: string = req.body.password

  // Validation User Input
  const { error } = UserValidInfo.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  if (await User.findOne({ email: req.body.email })) {
    return res.status(400).json({ message: 'User with this Email already exists...' })
  }
  const newUser: UserInterface = new User({ _id, name, email, password })
  try {
    const salt: string = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
    await newUser.save()

    const jwtSecretKey: string = process.env.JWT_TOKEN || ''

    const token: string = jwt.sign(
      { _id: newUser._id, name: newUser.name, email: newUser.email },
      jwtSecretKey,
      { algorithm: 'HS256', expiresIn: '1800s' },
    )

    res.status(200).json({
      message: `User with Name '${req.body.name}' Created Successfully !`,
      Token: token,
    })
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      error: error,
      message: error.message,
    })
  }
}
