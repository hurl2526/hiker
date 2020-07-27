const {check} = require('express-validator')

const checkTreasure = [
  check('Location', 'Description').not().isEmpty(),
];

module.exports = checkTreasure;