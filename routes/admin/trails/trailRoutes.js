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


router.get('/:zipCode',async (req,res,next)=>{
  try {
  let zip = req.params.zipCode
  console.log(zip)
  // const url = `https://prescriptiontrails.org/api/filter/?zip=87102&by=${zip}&offset=0&count=6`
  // const url =`https://prescriptiontrails.org/api/filter/?by=city&city=Albuquerque&offset=0&count=6`
  const url = `https://prescriptiontrails.org/api/filter/?zip=${zip}&by=zip&offset=0&count=6`
  const result = await axios.get(url);
  let data = result.data
  console.log(data.trails)
  return res.render("main/trails", {data})
  }catch(err){
    next(err)
  }
})

router.get('/single-trail/:id', (req, res, next) => {
  Trail.findById({ _id: req.params.id }).then((foundTrail) => {
    return res.render('main/single-trail', { trail: foundTrail });
  });
});
module.exports = router;