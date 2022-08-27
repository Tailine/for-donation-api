import { AppError } from '@shared/appError'
import { UserData } from './user-data'

export interface RegisterUserPort {
  execute(user: UserData): Promise<UserData | AppError>
}
