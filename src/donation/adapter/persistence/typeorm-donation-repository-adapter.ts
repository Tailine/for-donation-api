import { postgresDataSource } from '@config/typeorm'
import { Repository } from 'typeorm'
import { DonationDbData, DonationRepository } from './donation-repository-port'
import { Donation } from './donation.entity'

export class TypeormDonationRepository implements DonationRepository {
  private readonly donationRepository: Repository<Donation>

  constructor() {
    this.donationRepository = postgresDataSource.getRepository(Donation)
  }

  async createDonation(donationData: DonationDbData): Promise<DonationDbData> {
    return this.donationRepository.save(donationData)
  }
}
