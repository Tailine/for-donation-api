import { DonationData } from '@donation/application/port/donation-data'
import { AppError } from '@shared/appError'
import { Donation } from './donation.entity'

export interface DonationRepository {
  createDonation(
    donationData: NewDonation,
    userId: string
  ): Promise<Donation | AppError>
  findAll(): Promise<Donation[]>
  findById(id: string): Promise<Donation | null>
  delete(id: string): Promise<boolean>
}

export type NewDonation = Omit<DonationData, 'images'> & {
  images: string[]
}
