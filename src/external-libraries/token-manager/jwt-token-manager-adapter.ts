import { TokenManager, UserInfo } from './token-manager-port'
import jwt from 'jsonwebtoken'
import { AppError } from '@shared/appError'

export class JwtTokenManager implements TokenManager {
  private readonly secret: string = process.env.JWT_SECRET!

  sign(payload: Record<string, string>): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: '7d'
    })
  }

  verify(token: string): UserInfo | AppError {
    try {
      const decodedToken = jwt.verify(token, this.secret) as UserInfo
      return decodedToken
    } catch (err) {
      return new AppError('Acesso não autorizado.')
    }
  }
}
