import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const storage = require('multer-storage-cloudinary').CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'reposteria',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

export { cloudinary };