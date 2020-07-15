const express = require('express');
const router = express.Router();
const Trail = require('./admin/trails/models/Trail');
const trailsArray = require('./admin/trails/models/trailsArray')

const paginate = (req, res, next) => {
  const perPage = 6;
  const page = req.params.pageNumber;
  Trail.find()
    .skip(perPage * (page - 1))
    .limit(perPage)
    .populate('category')
    .exec((err, trails) => {
      if (err) return next(err);
      Trail.countDocuments().exec((err, count) => {
        if (err) return next(err);
        return res.render('main/home-trails', {
          trails:trails,
          pages: Math.ceil(count / perPage),
          page: +page,
        });
      });
    });
};

/* GET home page. */
router.get('/', function (req, res, next) {
  // if (req.user) {
  //   return paginate(req, res, next);
  // }
  // console.log(req.session)
  // return res.render('main/home',{trailsArray});
  return res.render('main/home')
});

// router.get('/page/:pageNumber',(req,res,next)=>{
//   return paginate(req,res,next)
// })

router.get('/logout', (req, res) => {
  // console.log('logout', req.session.cookie);
  // req.logout();
  res.clearCookie('connect.sid', {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null
  });
  req.session.destroy();
  // console.log('cookie', req.session);
  // return res.redirect('/');
  return res.render('auth/login')
});

module.exports = router;