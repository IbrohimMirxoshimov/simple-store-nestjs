import { Injectable } from '@nestjs/common';
import { put } from '@vercel/blob';

@Injectable()
export class FilesService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const blob = await put(file.originalname, file.buffer, {
        access: 'public',
      });

      return blob.url;
    } catch (error) {
      console.error(error);

      throw new Error('Failed to upload file');
    }
  }
}
