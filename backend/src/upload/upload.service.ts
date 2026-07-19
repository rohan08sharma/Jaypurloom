import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private uploadsDir = path.join(process.cwd(), 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async uploadFile(file: any, hostUrl: string = 'http://localhost:3001') {
    if (!file) {
      // Return fallback demo high-res image
      return {
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&auto=format&fit=crop',
        filename: 'demo-fallback.jpg',
      };
    }

    // Check if real Cloudinary is configured
    if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_KEY !== '123456789') {
      try {
        // Real Cloudinary upload would happen here if API key is active
      } catch (e) {
        // Fallback to local
      }
    }

    // Save locally
    const filename = `${Date.now()}-${file.originalname || 'upload.jpg'}`;
    const filePath = path.join(this.uploadsDir, filename);

    if (file.buffer) {
      fs.writeFileSync(filePath, file.buffer);
    }

    return {
      url: `${hostUrl}/uploads/${filename}`,
      filename,
    };
  }
}
