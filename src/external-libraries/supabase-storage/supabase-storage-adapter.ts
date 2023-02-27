import supabase from '@config/supabase'
import { Image } from '@donation/application/port/donation-data'
import { ImageStorage, UploadResult } from './image-storage'

export class SupabaseImageStorage implements ImageStorage {
  private readonly storageBucket = process.env.BUCKET!

  async listImageByUser(userId: string): Promise<UploadResult> {
    const ignoreFile = '.emptyFolderPlaceholder'
    const { data, error } = await supabase.storage
      .from(this.storageBucket)
      .list(userId, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      })

    if (error) {
      return {
        error,
        data: null
      }
    }

    const images = []
    for (const img of data ?? []) {
      if (img.name !== ignoreFile) {
        images.push(img.name)
      }
    }
    return {
      error,
      data: images
    }
  }

  async upload(
    userId: string,
    files: Image[]
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
    const fullPath = `${this.storageBucket}/${path}`
    return supabase.storage.from(this.storageBucket).getPublicUrl(fullPath)
      .publicURL
  }

  async delete(paths: string[]): Promise<boolean> {
    const { error } = await supabase.storage
      .from(this.storageBucket)
      .remove(paths)

    return error === null
  }

  async update(storageImages: string[], dbImages: string[]) {
    return Promise.resolve([] as string[])
  }
}
