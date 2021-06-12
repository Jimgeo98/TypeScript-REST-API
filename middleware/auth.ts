import jwt from 'jsonwebtoken'
import { NextFunction, Response } from 'express'
import { IGetUserAuthInfoRequest } from '../interfaces/UserInfoInterface'

export const authenticateToken = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Access denied. Not authorized...' })

  try {
    const jwtSecretKey: string = process.env.JWT_TOKEN || ''
    const decoded = jwt.verify(token, jwtSecretKey)
    req.user = decoded // IGetUserAuthInfoRequest Interface

    next()
  } catch (error) {
    if (error.message === 'jwt expired') {
      res.status(400).json({ message: 'jwt token has expired.' })
    } else {
      res.status(400).json({ message: 'Invalid auth token...' })
    }
    console.log(error)
  }
}
