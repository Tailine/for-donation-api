import { Donation } from '@donation/domain/donation'

export interface CreateDonationUseCase {
  execute(donation: Donation, userId: string): Promise<boolean>
}
