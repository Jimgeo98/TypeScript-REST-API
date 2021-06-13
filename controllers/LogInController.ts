import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'

// Login with User
export const userLogin = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ message: 'Invalid email or password...' })

    const validPassword: boolean = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password...' })

    const jwtSecretKey: string = process.env.JWT_TOKEN || ''

    const token: string = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      jwtSecretKey,
      { algorithm: 'HS256', expiresIn: '1800s' },
    )

    return res.status(200).json({
      message: `Welcome Back ${req.body.email} !`,
      Token: token,
    })
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      error: error,
      message: error.message,
    })
  }
}
