import { User } from '@user/domain/user'
import { IRegisterUser } from '@user/application/port/in/register-user-port'
import { Request, Response } from 'express'

export class RegisterUserController {
  constructor(private registerUserService: IRegisterUser) {}

  handle(request: Request, response: Response) {
    const { name, email, phone, state, city, password } = request.body

    if (!name || !email || !phone || !state || !city || !password) {
      return response.status(400).json({
        message: 'Informação incompleta. Verifique os dados inseridos.'
      })
    }

    const userOrError = User.create(name, email, city, state, phone, password)
    if (userOrError.isFailure) {
      return response.status(400).json({
        message: userOrError.error
      })
    }

    this.registerUserService.execute(userOrError.getValue()!)
  }
}

type UserRequestData = {
  name: string
  email: string
  phone: string
  state: string
  city: string
  password: string
}
