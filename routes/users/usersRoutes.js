const express = require('express');
const router = express.Router();
const User = require('./models/User');
const axios = require('axios');
const {
  register,
  updateProfile,
  updatePassword,
} = require('./controllers/userController');
const userValidation = require('./utils/userValidation');
const loginValidation = require('./utils/loginValidation');
const passport = require('passport');
const { check, validationResult } = require('express-validator');


const {createUserFav} = require('../fav/controllers/favControllers')



// api/users/  route 
router.get('/', function (req, res, next) {
  //just put the city or zip search bar here

  const trails = ["string 1","string 2"]
  res.render("main/home-trails",{trails})
  // res.send('respond with a resource');
});

router.post('/', function(req, res, next){

  // const trails = ["string 1","string 2"]
  // res.render("main/home-trails",{trails})
    const zip = req.body.zipCode;
    return res.redirect(`/api/trails/${zip}`);
  // } catch (err) {
  //   next(err);
  // }
});


router.post('/register', userValidation, register,createUserFav);

router.get('/register', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  return res.render('auth/register');
});

// router.post('/register', (req, res, next) => {
//   User.findOne({ email: req.body.email }).then((user) => {
//     if (user) {
//       return res.status(401).json({ msg: 'User already Exists' });
//     } else {
//       const user = new User();
//       user.profile.name = req.body.name;
//       user.email = req.body.email;
//       user.password = req.body.password;

//       user.save((err) => {
//         if (err) return next(err);
//         return res.status(200).json({ message: 'success', user });
//       });
//     }
//   });
// });

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect(301, '/');
  }
  return res.render('auth/login');
});

router.post(
  '/login',loginValidation,(req,res,next)=>{
      const errors = validationResult(req);
  if (!errors.isEmpty()){
    // return res.status(422).json({ errors: errors.array() });
    req.flash('errors', errors.errors[0].msg)
    return res.redirect('/api/users/login')
  }else {
    next()
    //goes where?
  }
  },passport.authenticate('local-login', {
    successRedirect: '/api/users/',
    failureRedirect: '/api/users/login',
    failureFlash: true,
  })
);


router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('auth/profile');
  }
  return res.send('Unauthorized');
});

router.get('/update-profile', (req, res) => {
  return res.render('auth/update-profile');
});

const checkPassword = [
  check('oldPassword', 'Please include valid password').isLength({ min: 6 }),
  check('newPassword', 'Please include valid password').isLength({ min: 6 }),
  check('repeatNewPassword', 'Please include valid password').isLength({ min: 6 }),
];

router.put('/update-profile', (req, res, next) => {
  updateProfile(req.body, req.user._id)
    .then(() => {
      return res.redirect(301, '/api/users/profile');
    })
    .catch((err) => next(err));
});

router.put('/update-password',checkPassword, (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()){
  req.flash('errors', 'Unable to update user');
  return res.redirect('/api/users/update-profile');}
  try {
    updatePassword(req.body, req.user._id)
      .then(() => {
        return res.redirect('/api/users/profile');
      })
      .catch((err) => {
        console.log(err);
        req.flash('errors', 'Unable to update user');
        return res.redirect('/api/users/update-profile');
      });
  } catch (errors) {
    console.log(errors);
  }
});

module.exports = router;

