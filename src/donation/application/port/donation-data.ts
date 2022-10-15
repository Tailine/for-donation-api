export type DonationData = {
  title: string
  email: string
  phone: string
  description: string
  images: Image[]
  categoryId: number
}

export type Image = {
  originalname: string
  buffer: Buffer
}
