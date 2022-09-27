import { makeRegisterUserController } from '@user/factories/makeRegisterUserController'
import { Router } from 'express'
import { makeAuthUserController } from '@user/factories/makeAuthUserController'
import { authorization } from '@shared/middlewares/authorization'
import { SignOutUserController } from '@user/adapter/signout-user-controller'

const userRoutes = Router()

userRoutes.post('/signup', makeRegisterUserController().handle)
userRoutes.get('/signin', makeAuthUserController().handle)
userRoutes.get('/signout', authorization, SignOutUserController.handle)

export { userRoutes }
