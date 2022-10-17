import { makeDonationController } from '@donation/factories/makeDonationController'
import { Router } from 'express'
import multer from 'multer'
import { makeQueryDonationController } from '@donation/factories/makeQueryDonationController'

const upload = multer()

const donationRoutes = Router()

donationRoutes.get('/', makeQueryDonationController().getAll)
donationRoutes.post(
  '/',
  upload.array('images'),
  makeDonationController().handle
)

export { donationRoutes }
