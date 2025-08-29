import express from 'express';
import Employee from '../models/Employee.js';
import middleware from '../utils/middleware.js';
import upload from '../utils/cloudinary-employees.js';
import cloudinary from '../config/cloudinary.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    return res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    return res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  middleware.userExtractor,
  middleware.isAdmin,
  upload.single('profilePicture'),
  [
    body('firstname').notEmpty().withMessage('First name is required.'),
    body('lastname').notEmpty().withMessage('Last name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('role_en').trim().notEmpty().withMessage('Role (EN) is required.'),
    body('role_de').trim().notEmpty().withMessage('Role (DE) is required.'),
    body('department_en')
      .trim()
      .notEmpty()
      .withMessage('Department (EN) is required.'),
    body('department_de')
      .trim()
      .notEmpty()
      .withMessage('Department (DE) is required.'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstname,
      lastname,
      email,
      role_en,
      role_de,
      department_en,
      department_de,
      telephone,
    } = req.body;

    const profilePicturePath = req.file ? req.file.path : null;

    const newEmployee = new Employee({
      firstname,
      lastname,
      email,
      role: { en: role_en, de: role_de },
      department: { en: department_en, de: department_de },
      telephone,
      profilePicture: {
        url: req.file?.path || 'https://www.gravatar.com/avatar/?d=mp&s=200',
        altText: `${firstname} ${lastname}'s profile picture`,
      },
      user: req.user._id,
    });

    const addedEmployee = await newEmployee.save();
    return res.status(201).json(addedEmployee);
  }
);

router.put(
  '/:id',
  middleware.userExtractor,
  middleware.isAdmin,
  upload.single('profilePicture'),
  [
    body('firstname').notEmpty().withMessage('First name is required.'),
    body('lastname').notEmpty().withMessage('Last name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('role_en').trim().notEmpty().withMessage('Role (EN) is required.'),
    body('role_de').trim().notEmpty().withMessage('Role (DE) is required.'),
    body('department_en')
      .trim()
      .notEmpty()
      .withMessage('Department (EN) is required.'),
    body('department_de')
      .trim()
      .notEmpty()
      .withMessage('Department (DE) is required.'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        firstname,
        lastname,
        email,
        role_en,
        role_de,
        department_en,
        department_de,
        telephone,
      } = req.body;

      const role = { en: role_en, de: role_de };
      const department = { en: department_en, de: department_de };

      let profilePicture = req.body.profilePicture;
      if (req.file) {
        profilePicture = {
          url: req.file.path,
          altText: `${firstname} ${lastname}'s profile picture`,
        };
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        {
          firstname,
          lastname,
          email,
          role,
          department,
          telephone,
          profilePicture,
        },
        { new: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      return res.status(200).json(updatedEmployee);
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
      const employee = await Employee.findById(req.params.id);

      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      // Delete profile picture from Cloudinary if not default
      if (
        employee.profilePicture &&
        !employee.profilePicture.url.includes('gravatar.com')
      ) {
        const url = employee.profilePicture.url;
        const publicId = url.split('/').slice(-2).join('/').split('.')[0];
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error('Cloudinary deletion error:', err);
        }
      }

      const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
      return res.status(200).json(deletedEmployee);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
