import { SupabaseImageStorage } from '../../external-libraries/supabase-storage/supabase-storage-adapter'
import { TypeormUserRepository } from '../../user/adapter/persistence/typeorm-user-repository-adapter'
import { CreateDonationController } from '@donation/adapter/web/create-donation-controller'
import { CreateDonationService } from '@donation/application/services/create-donation-service'
import { TypeormCategoryRepository } from '@category/adapter/persistence/typeorm-category-repository-adapter'
import { TypeormDonationRepository } from '@donation/adapter/persistence/typeorm-donation-repository-adapter'

export const makeCreateDonationController = () => {
  const userRepository = new TypeormUserRepository()
  const donationRepository = new TypeormDonationRepository()
  const categoryRepository = new TypeormCategoryRepository()
  const imageStorage = new SupabaseImageStorage()
  const donationService = new CreateDonationService(
    userRepository,
    donationRepository,
    categoryRepository,
    imageStorage
  )

  return new CreateDonationController(donationService)
}
