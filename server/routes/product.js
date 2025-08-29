import express from 'express';
import Product from '../models/Product.js';
import middleware from '../utils/middleware.js';
import upload from '../utils/cloudinary-products.js';
import attachCloudinaryResponse from '../utils/cloudinary-attach-response.js';
import cloudinary from '../config/cloudinary.js';
const router = express.Router();
import { body, validationResult } from 'express-validator';

// Validation rules
const productValidationRules = [
  body('common_name')
    .notEmpty()
    .withMessage('Common name is required.')
    .isString()
    .withMessage('Common name must be a string.'),
  body('description_en')
    .notEmpty()
    .withMessage('English description is required.')
    .isString()
    .withMessage('English description must be a string.'),
  body('description_de')
    .notEmpty()
    .withMessage('German description is required.')
    .isString()
    .withMessage('German description must be a string.'),
  body('height')
    .notEmpty()
    .withMessage('Height is required.')
    .matches(/^\d+(-\d+)?$/)
    .withMessage('Height must be in the format "min-max" or a single number.'),
  body('diameter')
    .notEmpty()
    .withMessage('Diameter is required.')
    .matches(/^\d+(-\d+)?$/)
    .withMessage(
      'Diameter must be in the format "min-max" or a single number.'
    ),
  body('hardiness')
    .notEmpty()
    .withMessage('Hardiness is required.')
    .matches(/^-?\d+(-\d+)?$/)
    .withMessage(
      'Hardiness must be in the format "min-max" or a single number.'
    ),
  body('light_en')
    .notEmpty()
    .withMessage('Light (EN) is required.')
    .isIn(['sun', 'half-shadow', 'shadow'])
    .withMessage('Light (EN) must be one of: sun, half-shadow, shadow.'),
  body('light_de')
    .notEmpty()
    .withMessage('Light (DE) is required.')
    .isIn(['sonne', 'halb-schatten', 'schatten'])
    .withMessage('Light (DE) must be one of: sonne, halb-schatten, schatten.'),
];

router.get('/', async (req, res, next) => {
  try {
    let products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  middleware.userExtractor,
  middleware.isAdmin,
  upload.array('images', 3),
  attachCloudinaryResponse,
  productValidationRules,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        common_name,
        description_en,
        description_de,
        height,
        diameter,
        hardiness,
        light_en,
        light_de,
        color,
      } = req.body;
      const description = {
        en: description_en || '',
        de: description_de || '',
      };
      const light = {
        en: light_en || 'sun',
        de: light_de || 'sonne',
      };

      const images = req.files
        ? req.files.map((file) => ({
            url: file.path,
            public_id:
              file.filename ||
              (() => {
                try {
                  return file.path.split('/').slice(-2).join('/').split('.')[0];
                } catch (e) {
                  return undefined;
                }
              })(),
          }))
        : [];

      if (images.length < 1)
        return res
          .status(400)
          .json({ error: 'At least one image is required.' });

      const newProduct = new Product({
        common_name,
        description,
        height,
        diameter,
        hardiness,
        light,
        images,
        color: color || undefined,
        user: req.user._id,
      });

      const addedProduct = await newProduct.save();
      return res.status(201).json(addedProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  middleware.userExtractor,
  middleware.isAdmin,
  upload.array('images', 3),
  productValidationRules,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        common_name,
        description_en,
        description_de,
        height,
        diameter,
        hardiness,
        light_en,
        light_de,
        color,
      } = req.body;

      const description = {
        en: description_en,
        de: description_de,
      };

      const light = {
        en: light_en,
        de: light_de,
      };

      const existingImages = req.body.existingImages
        ? JSON.parse(req.body.existingImages)
        : [];
      const uploadedImages = req.files
        ? req.files.map((file) => ({
            url: file.path,
            public_id:
              file.filename ||
              (() => {
                try {
                  return file.path.split('/').slice(-2).join('/').split('.')[0];
                } catch (e) {
                  return undefined;
                }
              })(),
          }))
        : [];

      const images = [...existingImages, ...uploadedImages];

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          common_name,
          description,
          height,
          diameter,
          hardiness,
          light,
          images,
          color: color || undefined,
        },
        { new: true }
      );

      return res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  middleware.userExtractor,
  middleware.isAdmin,
  async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ error: 'Product not found' });

      if (Array.isArray(product.images)) {
        for (const img of product.images) {
          // publicId extraction is best-effort; if it fails we'll log and continue
          try {
            const publicId = img.url
              .split('/')
              .slice(-2)
              .join('/')
              .split('.')[0];
            await cloudinary.uploader.destroy(publicId);
          } catch (error) {
            // Log and continue removing other images instead of aborting whole request
            console.error('Cloudinary delete error for', img?.url, error);
          }
        }
      }

      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res
        .status(500)
        .json({ error: 'An error occurred while deleting the product.' });
    }
  }
);

export default router;
