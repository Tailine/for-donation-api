import { RegisterUserPort } from '@user/application/port/register-user-port'
import { Response } from 'express'
import { TypedRequestBody } from '@config/expressTypes'
import { AppError } from '@shared/appError'

type UserRequestData = {
  name: string
  email: string
  phone: string
  state: string
  city: string
  password: string
}

export class RegisterUserController {
  constructor(private registerUserService: RegisterUserPort) {}

  handle = async (
    request: TypedRequestBody<UserRequestData>,
    response: Response
  ) => {
    const { name, email, phone, state, city, password } = request.body

    if (!name || !email || !phone || !state || !city || !password) {
      return response.status(400).json({
        message:
          'Todos os dados são obrigatórios. Verifique os dados inseridos.'
      })
    }

    try {
      const result = await this.registerUserService.execute({
        name,
        email,
        phone,
        state,
        city,
        password
      })

      if (result instanceof AppError) {
        return response.status(result.statusCode).json({
          message: result.message
        })
      }

      return response.status(200).json({
        data: result
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erro no servidor, tente novamente mais tarde'
      })
    }
  }
}
