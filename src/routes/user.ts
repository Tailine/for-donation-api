import { makeRegisterUserController } from '@user/factories/makeRegisterUserController'
import { Router } from 'express'
import { makeAuthUserController } from '@user/factories/makeAuthUserController'
import { authorization } from '@shared/middlewares/authorization'
import { SignOutUserController } from '@user/adapter/signout-user-controller'

const userRoutes = Router()

userRoutes.post('/sign-up', makeRegisterUserController().handle)
userRoutes.get('/sign-in', makeAuthUserController().handle)
userRoutes.get('/sign-out', authorization, SignOutUserController.handle)

export { userRoutes }
