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

//old api
// router.get('/:city',async (req,res,next)=>{
//   try {
//   let city = req.params.city
//   console.log(city)
//   // const url = `https://prescriptiontrails.org/api/filter/?zip=87102&by=${zip}&offset=0&count=6`
//   const url =`https://prescriptiontrails.org/api/filter/?by=city&city=${city}&offset=0&count=6`
//   // const url = `https://prescriptiontrails.org/api/filter/?zip=${zip}&by=zip&offset=0&count=6`
//   const result = await axios.get(url);
//   let data = result.data
//   console.log(data)
//   return res.render("main/trails", {data})
//   }catch(err){
//     next(err)
//   }
// })

router.get('/single-trail', (req, res, next) => {
  // Trail.findById({ _id: req.params.id }).then((foundTrail) => {
  //   return res.render('main/single-trail', { trail: foundTrail });
  // });
  return res.send('hello');
  // return res.render('main/single-trail');
});

//new api
router.get('/:zip', async (req, res, next) => {
  try {
    const api =
      'yaY02DcVxoZepInXaCW4dADQXEbZiu4UuDQA9Z8GgcVSMOoyF9QC3zrZwWSnt2mY';
    const zip = req.params.zip;
    console.log(zip);
    const url = `https://www.zipcodeapi.com/rest/${api}/info.json/${zip}/degrees`;
    const info = await axios.get(url);
    const lat = info.data.lat;
    const lon = info.data.lng;
    return res.redirect(`${lat}/${lon}/`);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.get('/:lat/:lon', function (req, res, next) {
  let lat = req.params.lat;
  let lon = req.params.lon;
  const api = '0b539ff2a9msh7d3f5f23a531e1cp1d0c8ejsn4e597722bd11';
  // const currentDate = await Date.now();
  axios({
    method: 'GET',
    url: 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'trailapi-trailapi.p.rapidapi.com',
      'x-rapidapi-key': '0b539ff2a9msh7d3f5f23a531e1cp1d0c8ejsn4e597722bd11',
      useQueryString: true,
    },
    params: {
      lat: `${lat}`,
      lon: `${lon}`,
    },
  })
    .then((response) => {
      console.log(response.data);
      let trails = response.data;
      return res.render('main/trails', { trails });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
