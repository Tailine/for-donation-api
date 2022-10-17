import { Donation } from '@donation/adapter/persistence/donation.entity'
import { AppError } from '@shared/appError'
import { DonationData } from './donation-data'

export interface CreateDonationUseCase {
  execute(donation: DonationData, userId: string): Promise<Donation | AppError>
}
