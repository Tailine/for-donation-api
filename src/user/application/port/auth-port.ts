import { AppError } from '@shared/appError'

export interface AuthPort {
  signIn(email: string, password: string): Promise<string | AppError>
}
