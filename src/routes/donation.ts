import { makeDonationController } from '@donation/factories/makeDonationController'
import { Router } from 'express'
import multer from 'multer'

const upload = multer()

const donationRoutes = Router()

donationRoutes.get('/')
donationRoutes.post(
  '/',
  upload.array('images'),
  makeDonationController().handle
)

export { donationRoutes }
