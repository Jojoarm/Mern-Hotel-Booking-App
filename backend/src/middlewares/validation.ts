import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  check('firstName', 'First Name is required').isString(),
  check('lastName', 'Last Name is required').isString(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password with 6 or more characters required').isLength({
    min: 6,
  }),
  handleValidationErrors,
];

export const validateUserLoginRequest = [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password with 6 or more characters required').isLength({
    min: 6,
  }),
  handleValidationErrors,
];

export const validateHotelRequest = [
  check('name').notEmpty().withMessage('Name is required'),
  check('city').notEmpty().withMessage('City is required'),
  check('country').notEmpty().withMessage('Country is required'),
  check('description').notEmpty().withMessage('Description is required'),
  check('type').notEmpty().withMessage('Hotel type is required'),
  check('pricePerNight')
    .notEmpty()
    .isNumeric()
    .withMessage('Price per night is required and must be a number'),
  check('facilities')
    .notEmpty()
    .isArray()
    .withMessage('Facilities are required'),
  handleValidationErrors,
];
