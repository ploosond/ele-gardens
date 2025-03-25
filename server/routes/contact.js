import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { firstname, lastname, email, phone, message } = req.body;

    const newContact = new Contact({
      firstname,
      lastname,
      email,
      phone,
      message,
    });

    const addedContact = await newContact.save();
    return res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
});

export default router;
