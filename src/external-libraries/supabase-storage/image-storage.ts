import { Image } from '@donation/application/port/donation-data'

export interface ImageStorage {
  upload(
    userId: string,
    files: Image[]
  ): Promise<{ data: { Key: string } | null; error: Error | null }[]>
  getImageUrl(path: string): string | null
}
