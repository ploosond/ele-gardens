import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    // Multilingual common name. Keep `en` required and unique, `de` optional.
    common_name: {
      en: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Common name (EN) is required.'],
      },
      de: {
        type: String,
        trim: true,
        required: false,
        default: '',
      },
    },

    // Multilingual descriptions
    description: {
      en: {
        type: String,
        trim: true,
        required: [true, 'English description is required.'],
      },
      de: {
        type: String,
        trim: true,
        required: [true, 'German description is required.'],
      },
    },

    // Images
    images: [
      {
        url: {
          type: String,
          required: [true, 'Image URL is required.'],
        },
        public_id: { type: String },
        altText: { type: String },
      },
    ],

    height: { type: String, required: [true, 'Height is required.'] },
    diameter: { type: String, required: [true, 'Diameter is required.'] },
    hardiness: { type: String, required: [true, 'Hardiness is required.'] },

    // Multilingual light info
    light: {
      en: {
        type: String,
        enum: ['sun', 'half-shadow', 'shadow'],
        required: [true, 'Light (EN) is required.'],
      },
      de: {
        type: String,
        enum: ['sonne', 'halb-schatten', 'schatten'],
        required: [true, 'Light (DE) is required.'],
      },
    },

    color: {
      type: String,
      default: '#6a844a',
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
