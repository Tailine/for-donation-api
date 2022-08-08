import { Donation } from '@donation/domain/donation'
import { CreateDonationUseCase } from '../port/in/create-donation-use-case'

export class CreateDonationService implements CreateDonationUseCase {
  execute(donation: Donation, userId: string): Promise<boolean> {
    return Promise.resolve(true)
  }
}
