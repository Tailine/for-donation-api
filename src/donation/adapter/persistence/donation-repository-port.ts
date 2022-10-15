import { DonationData } from '@donation/application/port/donation-data'
import { AppError } from '@shared/appError'

export interface DonationRepository {
  createDonation(
    donationData: DonationDbData
  ): Promise<DonationDbData | AppError>
}

export type DonationDbData = Omit<DonationData, 'images'> & {
  images: string[]
}
