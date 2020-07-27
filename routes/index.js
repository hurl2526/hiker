const express = require('express');
const router = express.Router();
const Trail = require('./admin/trails/models/Trail');
const trailsArray = require('./admin/trails/models/trailsArray')

/* GET home page. */
router.get('/', function (req, res, next) {
  return res.render('main/home',{trailsArray});
});

router.get('/logout', (req, res) => {
  res.clearCookie('connect.sid', {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null
  });
  req.session.destroy();
  return res.redirect('/');
});

module.exports = router;