const router = require('express').Router();
const Trail = require('./models/Trail');
const axios = require('axios');

// router.get('/all-trails/:id', (req, res, next) => {
//   Trail.find({ category: req.params.id })
//     .populate('category')
//     .exec((err, foundTrails) => {
//       if (err) return next(err);
//       return res.render('main/category', { trails: foundTrails });
//     });
// });


router.get('/:zipCode',function(req,res,next){
  let zip = req.params.zipCode
  const url = `https://prescriptiontrails.org/api/filter/?zip=87102&by=${zip}&offset=0&count=6`
  const result = axios.get(url);
  let data = result.trails
  console.log(result)
  console.log(data)
  return res.render("main/trails", {data})
})

router.get('/single-trail/:id', (req, res, next) => {
  Trail.findById({ _id: req.params.id }).then((foundTrail) => {
    return res.render('main/single-trail', { trail: foundTrail });
  });
});
module.exports = router;