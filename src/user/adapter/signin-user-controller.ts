import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { Email } from '@shared/email'
import { Password } from '@user/domain/password'

export class SigninUserController {
  static handle = async (request: Request, response: Response) => {
    const { email, password } = request.body

    const emailOrError = Email.create(email)
    const passwordOrError = Password.create(password)
    if (emailOrError.isFailure || passwordOrError.isFailure) {
      return response.status(400).json({ message: 'Email ou senha inválidos' })
    }

    // generate JWT token
    // set token on cookie

    return response.status(200).json({ email, password })

    // const token = jwt.sign()
  }
}
