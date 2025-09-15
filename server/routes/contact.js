import express from 'express';
import Contact from '../models/Contact.js';
import { sendContactNotification } from '../utils/emailService.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { firstname, lastname, email, phone, message } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !email || !message) {
      return res.status(400).json({
        error: 'Please fill in all required fields',
      });
    }

    // Save to database
    const newContact = new Contact({
      firstname,
      lastname,
      email,
      phone,
      message,
    });

    const addedContact = await newContact.save();

    // Send email notifications
    try {
      await sendContactNotification({
        firstname,
        lastname,
        email,
        phone,
        message,
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Continue even if email fails - contact is still saved
    }

    return res.status(201).json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
