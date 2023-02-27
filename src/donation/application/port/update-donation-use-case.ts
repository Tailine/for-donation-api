import { Donation } from '@donation/adapter/persistence/donation.entity'
import { AppError } from '@shared/appError'
import { DonationData } from './donation-data'

export interface UpdateDonationUseCase {
  execute(data: UpdateDonationData): Promise<Donation | AppError>
}

export type UpdateDonationData = {
  id: string
  userId: string
} & DonationData
