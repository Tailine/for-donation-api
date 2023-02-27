import { DonationRepository } from '@donation/adapter/persistence/donation-repository-port'
import { Donation } from '@donation/adapter/persistence/donation.entity'
import { DonationQueryPort } from '../port/donation-query-port'

export class DonationQueryService implements DonationQueryPort {
  constructor(private donationRepository: DonationRepository) {}

  getDonationById(id: string): Promise<Donation | null> {
    return this.donationRepository.findById(id)
  }

  async getDonations(): Promise<Donation[]> {
    return this.donationRepository.findAll()
  }
}
