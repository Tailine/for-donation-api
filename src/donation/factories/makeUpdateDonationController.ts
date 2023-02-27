import { TypeormDonationRepository } from '@donation/adapter/persistence/typeorm-donation-repository-adapter'
import { UpdateDonationService } from './../application/services/update-donation-service'
import { UpdateDonationController } from './../adapter/web/update-donation-controller'
import { TypeormUserRepository } from '@user/adapter/persistence/typeorm-user-repository-adapter'
import { TypeormCategoryRepository } from '@category/adapter/persistence/typeorm-category-repository-adapter'
import { SupabaseImageStorage } from '@external-libraries/supabase-storage/supabase-storage-adapter'
export const makeUpdateDonationController = () => {
  const donationRepository = new TypeormDonationRepository()
  const userRepository = new TypeormUserRepository()
  const categoryRepository = new TypeormCategoryRepository()
  const imageStorage = new SupabaseImageStorage()
  const updateDonationService = new UpdateDonationService(
    donationRepository,
    userRepository,
    categoryRepository,
    imageStorage
  )
  return new UpdateDonationController(updateDonationService)
}
