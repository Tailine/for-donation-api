import { AppError } from '@shared/appError'

export interface TokenManager {
  sign(payload: Record<string, string>): string
  verify(token: string): UserInfo | AppError
}

export type UserInfo = {
  userId: string
}
