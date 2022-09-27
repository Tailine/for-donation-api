import { Request, Response } from 'express'
import { Email } from '@shared/email'
import { Password } from '@user/domain/password'
import { AuthService } from '@user/application/service/auth-service'
import { AppError } from '@shared/appError'

export class SignInUserController {
  constructor(private authService: AuthService) {}

  handle = async (request: Request, response: Response) => {
    const { email, password } = request.body

    const emailOrError = Email.create(email)
    const passwordOrError = Password.create(password)
    if (emailOrError.isFailure || passwordOrError.isFailure) {
      return response.status(400).json({ message: 'Email ou senha inválidos' })
    }

    const errorOrToken = await this.authService.signIn(email, password)
    if (errorOrToken instanceof AppError) {
      return response.status(errorOrToken.statusCode).json({
        status: errorOrToken.statusCode,
        message: errorOrToken.message
      })
    }

    return response
      .cookie('access_token', errorOrToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      })
      .status(200)
      .json({ status: 200, message: 'Logged in successfully' })
  }
}
