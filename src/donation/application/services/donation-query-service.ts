import { DonationRepository } from '@donation/adapter/persistence/donation-repository-port'
import { Donation } from '@donation/adapter/persistence/donation.entity'
import { QueryDonationPort } from '../port/donation-query-port'

export class DonationQueryService implements QueryDonationPort {
  constructor(private donationRepository: DonationRepository) {}

  async getDonations(): Promise<Donation[]> {
    return this.donationRepository.findAll()
  }
}
