import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Product from "../models/Product.js";
import config from "../utils/config.js";
import products from "../data/db.js";
import logger from "../utils/logger.js";
import employee from "../data/employee.js";
import Employee from "../models/Employee.js";
dotenv.config();

mongoose.connect(config.MONGODB_URI);

const seedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Employee.deleteMany();

    const adminUser = new User({
      fullname: "Super User",
      username: "root",
      email: "root@example.com",
      password: "password",
      role: "admin",
    });
    await adminUser.save();

    const customerUser = new User({
      fullname: "Prajwol Devkota",
      username: "ploosond",
      email: "prajwol@example.com",
      password: "password",
    });

    await customerUser.save();

    const userID = adminUser._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: userID,
    }));

    const sampleEmployees = employee.map((employee) => ({
      ...employee,
      user: userID,
    }));

    await Product.insertMany(sampleProducts);

    await Employee.insertMany(sampleEmployees);

    logger.info("Products seeded successfully");
    process.exit();
  } catch (error) {
    logger.error("Error seeding the data: ", error);
    process.exit(1);
  }
};

seedData();
