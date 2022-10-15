import supabase from '@config/supabase'
import { ImageStorage } from './image-storage'

export class SupabaseImageStorage implements ImageStorage {
  private readonly storageBucket = 'donations'

  async upload(
    userId: string,
    files: Express.Multer.File[]
  ): Promise<{ data: { Key: string } | null; error: Error | null }[]> {
    const promises = []
    for (const file of files) {
      promises.push(
        supabase.storage
          .from(this.storageBucket)
          .upload(`${userId}/${file.originalname}`, file.buffer)
      )
    }

    return Promise.all(promises).then((data) => data)
  }

  getImageUrl(path: string): string | null {
    return supabase.storage.from(this.storageBucket).getPublicUrl(path)
      .publicURL
  }
}
