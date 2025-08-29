import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'employees', // Folder in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 800, height: 800, crop: 'fill' }],
    // ensure a deterministic public_id is set so multer provides file.filename
    public_id: (req, file) => {
      // build a short, safe base name without extension so Cloudinary will
      // create a clean public_id under the configured folder
      const base = file.originalname
        .replace(/\.[^.]+$/, '') // remove extension
        .replace(/[^a-z0-9_.-]/gi, '-')
        .toLowerCase()
        .slice(0, 50);
      return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${base}`;
    },
  },
});

const upload = multer({ storage });

export default upload;
