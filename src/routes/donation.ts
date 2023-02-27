import { makeCreateDonationController } from '@donation/factories/makeCreateDonationController'
import { Router } from 'express'
import multer from 'multer'
import { makeQueryDonationController } from '@donation/factories/makeQueryDonationController'
import { makeDeleteDonationController } from '@donation/factories/makeDeleteDonationController'
import { makeUpdateDonationController } from '@donation/factories/makeUpdateDonationController'
import { makeAuthorizationMiddleware } from '@shared/factories/makeAuthorizationMiddleware'

const upload = multer()

const donationRoutes = Router()
const queryDonation = makeQueryDonationController()
const authorization = makeAuthorizationMiddleware()

donationRoutes.get('/:id', queryDonation.getById)
donationRoutes.get('/', queryDonation.getAll)
donationRoutes.post(
  '/',
  upload.array('images'),
  makeCreateDonationController().handle
)
donationRoutes.delete('/:id', makeDeleteDonationController().handle)
donationRoutes.patch('/:id', makeUpdateDonationController().handle)

export { donationRoutes }
