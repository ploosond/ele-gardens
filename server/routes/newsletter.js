import express from 'express';
import Subscriber from '../models/Subscriber.js';

const router = express.Router();

// POST /api/newsletter
router.post('/', async (req, res, next) => {
  try {
    const { email, name, consent = true } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Upsert: avoid duplicate subscribers
    const existing = await Subscriber.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existing) {
      return res.status(200).json({ message: 'Already subscribed' });
    }

    const subscriber = new Subscriber({ email, name, consent });
    const saved = await subscriber.save();
    return res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});

export default router;
