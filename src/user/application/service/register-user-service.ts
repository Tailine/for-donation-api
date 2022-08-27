import { PasswordEncoder } from '@user/application/port/password-encoder'
import { RegisterUserPort } from '@user/application/port/register-user-port'
import { UserRepository } from '@user/adapter/persistence/user-repository-port'
import { UserData } from '../port/user-data'
import { User } from '@user/domain/user'
import { AppError } from '@shared/appError'

export class RegisterUserService implements RegisterUserPort {
  constructor(
    private userRepository: UserRepository,
    private passwordEncoder: PasswordEncoder
  ) {}

  async execute(userData: UserData): Promise<UserData | AppError> {
    // validate userdata
    // check if user exists on database

    const userOrError = User.create(
      userData.name,
      userData.email,
      userData.city,
      userData.state,
      userData.phone,
      userData.password
    )

    if (userOrError.isFailure) {
      return new AppError(userOrError.error!)
    }

    const hashedPassword = await this.passwordEncoder.hash(userData.password)

    return this.userRepository.registerUser({
      ...userData,
      password: hashedPassword
    })
  }
}
