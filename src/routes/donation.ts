import { makeCreateDonationController } from '@donation/factories/makeCreateDonationController'
import { Router } from 'express'
import multer from 'multer'
import { makeQueryDonationController } from '@donation/factories/makeQueryDonationController'
import { makeDeleteDonationController } from '@donation/factories/makeDeleteDonationController'

const upload = multer()

const donationRoutes = Router()
const queryDonation = makeQueryDonationController()

donationRoutes.get('/:id', queryDonation.getById)
donationRoutes.get('/', queryDonation.getAll)
donationRoutes.post(
  '/',
  upload.array('images'),
  makeCreateDonationController().handle
)
donationRoutes.delete('/:id', makeDeleteDonationController().handle)

export { donationRoutes }
