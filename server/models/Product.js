import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: true,
    },
    scientific_name: { type: String, required: true, trim: true },
    common_name: { type: String, trim: true },
    category: { type: String, enum: ["grass", "flower"], required: true },
    description: { type: String },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: { type: String },
      },
    ],
    height: { type: Number, required: true },
    diameter: { type: Number, required: true },
    hardiness: { type: Number, required: true },
    light: {
      type: String,
      enum: ["sun", "half-shadow", "shadow"],
      required: true,
    },
    color: {
      type: String,
      default: "#E7E381",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
