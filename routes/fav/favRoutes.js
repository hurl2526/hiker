const router = require('express').Router();
const Fav = require('./models/Fav');

router.post('/:trail_id', (req, res, next) => {
  Fav.findOne({ owner: req.user._id })
    .then((fav) => {
      fav.items.push({
        item: req.body.trail_id,
        // price: parseFloat(req.body.priceValue),
        // quantity: parseInt(req.body.quantity),
      });
      // cart.total = (cart.total + parseFloat(req.body.priceValue)).toFixed(2);

      fav
        .save()
        .then((fav) => {
          return res.redirect('/api/fav');
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.get('/', (req, res, next) => {
  Fav.findOne({ owner: req.user._id })
    .populate('items.item')
    .exec((err, foundfav) => {
      if (err) return next(err);
      return res.render('main/fav', {
        foundfav,
        messages: req.flash('remove'),
      });
    });
});

router.post('/trail/remove', (req, res, next) => {
  Fav.findOne({ owner: req.user._id }).then((fav) => {
    fav.items.pull(String(req.body.item));
    // cart.total = (cart.total - parseFloat(req.body.price)).toFixed(2);

    fav.save().then((fav) => {
      req.flash('remove', 'Successfully removed');
      return res.redirect('/api/fav');
    });
  });
});

module.exports = router;
