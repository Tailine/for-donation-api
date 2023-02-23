import { makeRegisterUserController } from '@user/factories/makeRegisterUserController'
import { Router } from 'express'
import { makeAuthUserController } from '@user/factories/makeAuthUserController'
import { SignOutUserController } from '@user/adapter/signout-user-controller'

const userRoutes = Router()

userRoutes.post('/sign-up', makeRegisterUserController().handle)
userRoutes.post('/sign-in', makeAuthUserController().handle)
userRoutes.get('/sign-out', SignOutUserController.handle)

export { userRoutes }
