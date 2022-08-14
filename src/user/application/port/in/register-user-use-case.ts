import { User } from './../../../domain/user'

export interface RegisterUserUseCase {
  execute(user: User): Promise<boolean>
}
