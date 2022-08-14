import { AppError } from '@shared/appError'
import { TypedRequestBody } from '@config/expressTypes'
import { RegisterUserUseCase } from '@user/application/port/in/register-user-use-case'
import { Response } from 'express'
import { User } from '@user/domain/user'

export class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async execute(
    request: TypedRequestBody<{
      name: string
      email: string
      city: string
      state: string
      phone: string
      password: string
    }>,
    response: Response
  ) {
    const { name, city, email, password, phone, state } = request.body

    try {
      if (!name || !city || !email || !password || !phone || !state) {
        throw new AppError('Missing required properties.')
      }

      const userResult = User.createWithoutId(
        name,
        email,
        city,
        state,
        phone,
        password
      )
      if (userResult.isFailure && userResult.error) {
        throw new AppError(userResult.error)
      }

      await this.registerUserUseCase.execute(userResult.getValue()!)
    } catch (err) {
      console.error(err)
      return err
    }

    return response.status(200).json()
  }
}
