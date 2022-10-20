import { SupabaseImageStorage } from './../../external-libraries/supabase-storage/supabase-storage-adapter'
import { DeleteDonationService } from '@donation/application/services/delete-donation-service'
import { DeleteDonationController } from './../adapter/web/delete-donation-controller'
import { TypeormDonationRepository } from '@donation/adapter/persistence/typeorm-donation-repository-adapter'

export const makeDeleteDonationController = () => {
  const imageStorage = new SupabaseImageStorage()
  const donationRepository = new TypeormDonationRepository()
  const donationService = new DeleteDonationService(
    donationRepository,
    imageStorage
  )
  return new DeleteDonationController(donationService)
}
