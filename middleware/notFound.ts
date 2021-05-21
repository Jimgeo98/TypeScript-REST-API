import { Request, Response, NextFunction } from 'express'

export const notFoundHandler = (request: Request, response: Response, next: NextFunction) => {
  response.status(404).json({
    status: response.statusCode,
    message: "the page you are looking for doesn't exists",
  })
}
