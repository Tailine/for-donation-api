import { Donation } from '@donation/adapter/persistence/donation.entity'

export interface DonationQueryPort {
  getDonations(): Promise<Donation[]>
}
