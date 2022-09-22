import { RegisterUserController } from '@user/adapter/register-user-controller'
import { TypeormUserRepository } from '@user/adapter/persistence/typeorm-user-repository-adapter'
import { RegisterUserService } from '@user/application/service/register-user-service'
import { BcryptEncoder } from '@user/adapter/persistence/bcrypt-encoder'

export const makeRegisterUserController = () => {
  const userRepository = new TypeormUserRepository()
  const bcryptEncoder = new BcryptEncoder()
  const registerUserService = new RegisterUserService(
    userRepository,
    bcryptEncoder
  )
  return new RegisterUserController(registerUserService)
}
