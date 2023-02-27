import { AppError } from '@shared/appError'

export interface AuthPort {
  signIn(email: string, password: string): Promise<AuthData | AppError>
}

export type AuthData = {
  id: string
  token: string
}
