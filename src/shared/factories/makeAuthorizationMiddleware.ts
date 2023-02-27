import { JwtTokenManager } from '@external-libraries/token-manager/jwt-token-manager-adapter'
import { Authorization } from '@shared/middlewares/authorization'

export const makeAuthorizationMiddleware = () => {
  const tokenManager = new JwtTokenManager()
  return new Authorization(tokenManager)
}
