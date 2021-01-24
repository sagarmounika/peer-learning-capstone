/**
 * validations for the user model
 */

import { body } from 'express-validator';
import { isRequestValidated } from './error';

export const ValidateUserSignUp = [
  body('firstname')
    .notEmpty()
    .withMessage('firstname cannot be empty')
    .trim()
    .isAlpha()
    .withMessage('firstname can only contain aplhabets')
    .isLength({ min: 3, max: 50 })
    .withMessage('firstname should be from 3 to 50 chars'),

  body('lastname')
    .notEmpty()
    .withMessage('lastname cannot be empty')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('lastname should be from 3 to 50 chars')
    .isAlpha()
    .withMessage('lastname can only have alphabets'),

  body('middlename').trim().isLength({ min: 0, max: 50 }).withMessage('middlename can be MAX 50 chars'),

  body('username')
    .trim()
    .notEmpty()
    .withMessage('username cannot be empty')
    .isLength({ min: 6, max: 15 })
    .withMessage('username can be from 6 to 15 chars'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 6, max: 20 })
    .withMessage('password should be from 6 to 50 chars'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('please send a valid email')
    .normalizeEmail({ all_lowercase: true }),

  body('insti_name').trim().isLength({ max: 70 }).withMessage('name of institution cannot be more than 70 chars'),

  body('insti_type')
    .trim()
    .isAlpha()
    .withMessage('type of instituition must be a string')
    .isIn(['school', 'college', 'university', 'uni', 'other'])
    .withMessage('type of of instituion must be any one of 5 values - school, college, university, uni, other'),

  body('gender')
    .notEmpty()
    .withMessage('gender cannot be empty')
    .trim()
    .isIn(['male', 'female', 'm', 'f', 'other'])
    .withMessage('gender should be one of the following values - male, female, m, f, other'),

  body('mobile')
    .trim()
    .isMobilePhone('any', { strictMode: true })
    .withMessage('please send a valid mobile phone  number. It should start with a country code +918156245781'),

  body('city')
    .notEmpty()
    .withMessage('city cannot be empty')
    .trim()
    .toLowerCase()
    .isAlpha()
    .withMessage('city name can only be alpha')
    .isLength({ min: 2, max: 100 })
    .withMessage('city name should be from 2 and 100 chars'),

  body('state')
    .notEmpty()
    .withMessage('state cannot be empty')
    .trim()
    .toLowerCase()
    .isAlpha()
    .withMessage('state name can only be alpha')
    .isLength({ min: 2, max: 100 })
    .withMessage('state name should be from 2 and 100 chars'),

  body('country')
    .notEmpty()
    .withMessage('country cannot be empty')
    .trim()
    .toLowerCase()
    .isAlpha()
    .withMessage('country name can only be alpha')
    .isLength({ min: 2, max: 100 })
    .withMessage('country name should be from 2 and 100 chars'),

  body('dob')
    .notEmpty()
    .withMessage('dob cannot be empty')
    .isDate({ format: 'DD/MM/YYYY' })
    .withMessage('Date of birth should be a valid date'),

  isRequestValidated,
];
