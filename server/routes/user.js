import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import middleware from "../utils/middleware.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { fullname, username, email, password, role } = req.body;

    // Check if all required fields are provided
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!password || password.length < 3) {
      return res.status(400).json({
        error:
          "The password must be provided and must be at least 3 characters long.",
      });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists!" });
    }

    // Create and save the new user
    const newUser = new User({ fullname, username, email, password, role });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Validate input
    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ error: "Email/Username and password are required" });
    }

    // Check if user exists by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/profile", middleware.userExtractor, async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
