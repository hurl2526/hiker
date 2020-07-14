const router = require('express').Router();
const Trail = require('./models/Trail');

router.get('/all-trails/:id', (req, res, next) => {
  Trail.find({ category: req.params.id })
    .populate('category')
    .exec((err, foundTrails) => {
      if (err) return next(err);
      return res.render('main/category', { trails: foundTrails });
    });
});

router.get('/single-trail/:id', (req, res, next) => {
  Trail.findById({ _id: req.params.id }).then((foundTrail) => {
    return res.render('main/single-trail', { trail: foundTrail });
  });
});
module.exports = router;