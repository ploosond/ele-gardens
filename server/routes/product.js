import express from "express";
import Product from "../models/Product.js";
import middleware from "../utils/middleware.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { category, light } = req.query;

    let query = {};

    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    if (light && light.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    let products = await Product.find(query);
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  middleware.userExtractor,
  middleware.isAdmin,
  async (req, res, next) => {
    try {
      const {
        tag,
        scientific_name,
        common_name,
        category,
        description,
        images,
        height,
        diameter,
        hardiness,
        light,
      } = req.body;
      const newProduct = new Product({
        tag,
        scientific_name,
        common_name,
        category,
        description,
        images,
        height,
        diameter,
        hardiness,
        light,
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
  "/:id",
  middleware.userExtractor,
  middleware.isAdmin,
  async (req, res, next) => {
    try {
      const body = req.body;
      const product = {
        tag: body.tag,
        scientific_name: body.scientific_name,
        common_name: body.common_name,
        category: body.category,
        description: body.description,
        images: body.images,
        height: body.height,
        diameter: body.diameter,
        hardiness: body.hardiness,
        light: body.light,
      };

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        product,
        { new: true }
      );

      return res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  middleware.userExtractor,
  middleware.isAdmin,
  async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      return res.status(200).json(deletedProduct);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
