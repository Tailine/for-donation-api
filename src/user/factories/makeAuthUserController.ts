import { JwtTokenManager } from '../../external-libraries/token-manager/jwt-token-manager-adapter'
import { BcryptEncoder } from '@user/adapter/persistence/bcrypt-encoder'
import { TypeormUserRepository } from '@user/adapter/persistence/typeorm-user-repository-adapter'
import { AuthService } from '@user/application/service/auth-service'
import { SignInUserController } from '@user/adapter/signin-user-controller'

export const makeAuthUserController = () => {
  const userRepository = new TypeormUserRepository()
  const bcryptEncoder = new BcryptEncoder()
  const passwordManager = new JwtTokenManager()
  const registerUserService = new AuthService(
    userRepository,
    bcryptEncoder,
    passwordManager
  )
  return new SignInUserController(registerUserService)
}
