import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const authorization = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const accessToken = request.cookies.access_token
  if (!accessToken) {
    return response.sendStatus(403)
  }

  try {
    const data = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload
    console.log({ data })
    request.id = data.userId
    return next()
  } catch (error) {
    return response.sendStatus(403)
  }
}
