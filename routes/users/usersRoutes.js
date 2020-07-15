const express = require('express');
const router = express.Router();
const User = require('./models/User');
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
/* GET users listing. */
router.get('/', function (req, res, next) {

  //do axios call here or in another route and redirect to /
  const trails = ["string 1","string 2"]
  res.render("main/home-trails",{trails})
  // res.send('respond with a resource');
});

// const checkRegister = [
//   check('name', 'Name is required').not().isEmpty(),
//   check('email', 'Please include valid email').isEmail(),
//   check('password', 'Please include valid password').isLength({ min: 6 }),
// ];

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

// router.post('/login', (req,res,next)=>{
//   res.redirect('/api/users')
// })


// router.post('/add-category',checkCategory, (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()){
//     // return res.status(422).json({ errors: errors.array() });
//     req.flash('errors', errors.errors[0].msg)
//     return res.redirect('/api/admin/add-category')
//   }


router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('auth/profile');
  }
  return res.send('Unauthorized');
});

router.get('/update-profile', (req, res) => {
  return res.render('auth/update-profile');
});

// router.put('/update-profile', (req, res, next) => {
//   return new Promise((resolve, reject) => {
//     User.findById({ _id: req.user._id })
//       .then((user) => {
//         const {
//           email,
//           address,
//         } = req.body;
//         if (req.body.name) user.profile.name = req.body.name;
//         if (email) user.email = email;
//         if (address) user.address = address;
//         return user;
//       })
//       .then((user) => {
//         user
//           .save()
//           .then((user) => {
//             return res.json({ user });
//             //resolve(user)
//           })
//           .catch((err) => reject(err));
//       })
//       .catch((err) => reject(err));
//   });
// });
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
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  try {
    updatePassword(req.body, req.user._id)
      .then(() => {
        return res.redirect('/api/users/profile');
      })
      .catch((err) => {
        console.log(err);
        req.flash('perrors', 'Unable to update user');
        return res.redirect('/update/users/update-profile');
      });
  } catch (errors) {
    console.log(errors);
  }
});

module.exports = router;

