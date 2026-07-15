import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

let isCloudinaryConfigured = false;

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  isCloudinaryConfigured = true;
  console.log('[Media] Cloudinary configured successfully.');
} else {
  console.log('[Media] Cloudinary credentials missing. Media upload will fallback to returning high-quality placeholder assets.');
}

export const uploadMedia = async (fileBufferOrPath: string | Buffer): Promise<string> => {
  if (isCloudinaryConfigured) {
    try {
      const result = await cloudinary.uploader.upload(fileBufferOrPath as string, {
        folder: 'srishti-studios'
      });
      return result.secure_url;
    } catch (err: any) {
      console.error('[Media] Cloudinary upload failed. Falling back to mock URL.', err.message);
    }
  }

  // Mock Upload Fallback: Return a premium visual placeholder
  const mockImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
  ];
  const randomUrl = mockImages[Math.floor(Math.random() * mockImages.length)];
  return randomUrl;
};

export const getCloudinaryStatus = () => isCloudinaryConfigured;
export { cloudinary };
