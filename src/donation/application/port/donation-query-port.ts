import { Donation } from '@donation/adapter/persistence/donation.entity'

export interface DonationQueryPort {
  getDonations(): Promise<Donation[]>
  getDonationById(id: string): Promise<Donation | null>
}
