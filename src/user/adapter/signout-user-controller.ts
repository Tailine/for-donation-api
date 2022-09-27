import { Request, Response } from 'express'

export class SignOutUserController {
  static handle = async (_: Request, response: Response) => {
    return response.clearCookie('access_token').status(200).json({
      message: 'User logged out successfully'
    })
  }
}
