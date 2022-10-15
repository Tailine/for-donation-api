import { DonationDbData } from '@donation/adapter/persistence/donation-repository-port'
import { AppError } from '@shared/appError'
import { DonationData } from './donation-data'

export interface CreateDonationUseCase {
  execute(
    donation: DonationData,
    userId: string
  ): Promise<DonationDbData | AppError>
}
