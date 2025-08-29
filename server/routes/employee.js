import express from 'express';
import Employee from '../models/Employee.js';
import middleware from '../utils/middleware.js';
import upload from '../utils/cloudinary-employees.js';
import attachCloudinaryResponse from '../utils/cloudinary-attach-response.js';
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
  attachCloudinaryResponse,
  [
    body('firstname').notEmpty().withMessage('First name is required.'),
    body('lastname').notEmpty().withMessage('Last name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('telephone').trim().notEmpty().withMessage('Telephone is required.'),
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
        public_id:
          req.file?.filename ||
          (req.file?.path
            ? (() => {
                try {
                  return req.file.path
                    .split('/')
                    .slice(-2)
                    .join('/')
                    .split('.')[0];
                } catch (e) {
                  return undefined;
                }
              })()
            : undefined),
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
    body('telephone').trim().notEmpty().withMessage('Telephone is required.'),
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

      // Build update object and only set profilePicture when a new file
      // is uploaded or when a valid profilePicture payload is provided.
      const updateObj = {
        firstname,
        lastname,
        email,
        role,
        department,
        telephone,
      };

      if (req.file) {
        // If replacing an existing profile picture, try to remove the old one from Cloudinary
        try {
          const existing = await Employee.findById(req.params.id);
          if (
            existing &&
            existing.profilePicture &&
            !existing.profilePicture.url.includes('gravatar.com')
          ) {
            const oldPublicId =
              existing.profilePicture.public_id ||
              (() => {
                try {
                  return existing.profilePicture.url
                    .split('/')
                    .slice(-2)
                    .join('/')
                    .split('.')[0];
                } catch (e) {
                  return undefined;
                }
              })();

            if (oldPublicId) {
              try {
                await cloudinary.uploader.destroy(oldPublicId);
              } catch (err) {
                console.error(
                  'Cloudinary deletion error for old employee picture:',
                  err
                );
              }
            }
          }
        } catch (err) {
          // Non-fatal: log and continue
          console.error(
            'Error while attempting to remove old profile picture:',
            err
          );
        }

        updateObj.profilePicture = {
          url: req.file.path,
          public_id:
            req.file.filename ||
            (() => {
              try {
                return req.file.path
                  .split('/')
                  .slice(-2)
                  .join('/')
                  .split('.')[0];
              } catch (e) {
                return undefined;
              }
            })(),
          altText: `${firstname} ${lastname}'s profile picture`,
        };
      } else if (req.body.profilePicture) {
        // client might send a JSON string or url; try to parse
        try {
          updateObj.profilePicture = JSON.parse(req.body.profilePicture);
        } catch (e) {
          // if it's not JSON, assume it's a URL
          updateObj.profilePicture = { url: req.body.profilePicture };
        }
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        updateObj,
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
        const publicId =
          employee.profilePicture.public_id ||
          (() => {
            try {
              return employee.profilePicture.url
                .split('/')
                .slice(-2)
                .join('/')
                .split('.')[0];
            } catch (e) {
              return undefined;
            }
          })();

        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.error('Cloudinary deletion error:', err);
          }
        } else {
          console.warn(
            'No public_id available for employee profile picture:',
            employee.profilePicture.url
          );
        }
      }

      const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .json({ message: 'Employee deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
