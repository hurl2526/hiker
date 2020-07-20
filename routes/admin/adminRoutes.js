const router = require('express').Router();

// const {validationResult} = require('express-validator')
// const {waterfall} = require('async')

// const faker = require('faker')
// const Product = require('./products/models/Product')
// const Category = require('./categories/models/Category');
const checkCategory = require('./categories/utils/checkCategory')
const validation= require('./adminValidation/categoryValidation')
const createTrail = require('./trails/helper/createTrails')


router.get('/add-category', (req, res, next) => {
  return res.render('admin/add-category')
});

router.post('/add-category',checkCategory, validation, createTrail)


module.exports = router;