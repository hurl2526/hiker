const { check } = require('express-validator');

const loginValidation = [
  check('email', 'Please include valid email').not().isEmpty(),
  check('password', 'Please include valid password').not().isEmpty()
];


module.exports = loginValidation;