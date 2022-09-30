import { Donation } from '@donation/domain/donation'
import { CreateDonationUseCase } from '../port/create-donation-use-case'

interface

export class CreateDonationService implements CreateDonationUseCase {
  execute(donation: Donation, userId: string): Promise<boolean> {
    return Promise.resolve(true)
  }
}
