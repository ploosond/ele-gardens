import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'employees', // Folder in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 800, height: 800, crop: 'fill' }],
  },
});

const upload = multer({ storage });

export default upload;
