import { PasswordEncoder } from '@user/application/port/password-encoder'
import { UserRepository } from '@user/adapter/persistence/user-repository-port'
import { AuthPort } from '../port/auth-port'
import { AppError } from '@shared/appError'
import { TokenManager } from '@external-libraries/token-manager/token-manager-port'

export class AuthService implements AuthPort {
  constructor(
    private userRepository: UserRepository,
    private passwordEncoder: PasswordEncoder,
    private tokenManager: TokenManager
  ) {}

  async signIn(email: string, password: string): Promise<string | AppError> {
    const errorMsgPassOrEmail = 'Email e/ou senha incorreto(s)'
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      return new AppError(errorMsgPassOrEmail, 401)
    }

    const isPasswordCorrect = await this.passwordEncoder.compare(
      password,
      user.password
    )
    if (!isPasswordCorrect) {
      return new AppError(errorMsgPassOrEmail, 401)
    }

    const token = this.tokenManager.sign({ userId: user.id })
    return token
  }
}
