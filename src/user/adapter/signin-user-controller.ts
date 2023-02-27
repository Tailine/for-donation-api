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
    console.log({ passwordOrError })
    if (emailOrError.isFailure || passwordOrError.isFailure) {
      return response.status(400).json({ message: 'Email ou senha inválidos' })
    }

    const errorOrAuthData = await this.authService.signIn(email, password)
    if (errorOrAuthData instanceof AppError) {
      return response.status(errorOrAuthData.statusCode).json({
        message: errorOrAuthData.message
      })
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    }

    response.cookie('user_id', errorOrAuthData.id, cookieOptions)
    response.cookie('access_token', errorOrAuthData.token, cookieOptions)
    return response.status(200).json({ message: 'Usuário logado' })
  }
}
