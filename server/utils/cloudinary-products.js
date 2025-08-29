import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products', // Folder in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 800, height: 800, crop: 'fill' }],
    // ensure multer receives a filename matching Cloudinary public_id
    public_id: (req, file) => {
      const base = file.originalname
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-z0-9_.-]/gi, '-')
        .toLowerCase()
        .slice(0, 50);
      return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${base}`;
    },
  },
});

const upload = multer({ storage });

export default upload;
