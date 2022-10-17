import { DonationQueryService } from './../application/services/donation-query-service'
import { QueryDonationController } from '@donation/adapter/web/query-donation-controller'
import { TypeormDonationRepository } from '@donation/adapter/persistence/typeorm-donation-repository-adapter'

export const makeQueryDonationController = () => {
  const donationRepository = new TypeormDonationRepository()
  const donationService = new DonationQueryService(donationRepository)
  return new QueryDonationController(donationService)
}
