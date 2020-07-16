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


//new api
router.get('/:zip',async (req,res,next)=>{
  try {
    const api =
      'yaY02DcVxoZepInXaCW4dADQXEbZiu4UuDQA9Z8GgcVSMOoyF9QC3zrZwWSnt2mY';
    const zip = req.params.zip;
    console.log(zip)
    const url = `https://www.zipcodeapi.com/rest/${api}/info.json/${zip}/degrees`;
    const info = await axios.get(url);
    const lat = info.data.lat;
    const lon = info.data.lng;
    return res.redirect(`${lat}/${lon}/`);
  } catch (err) {
    console.log(err)
    next(err);
  }
});
router.get('/:lat/:lon', function (req, res, next) {
    let lat = req.params.lat;
    let lon = req.params.lon;
    const api = '0b539ff2a9msh7d3f5f23a531e1cp1d0c8ejsn4e597722bd11'
    // const currentDate = await Date.now();
    axios({
      "method":"GET",
      "url":"https://trailapi-trailapi.p.rapidapi.com/trails/explore/",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"trailapi-trailapi.p.rapidapi.com",
      "x-rapidapi-key":"0b539ff2a9msh7d3f5f23a531e1cp1d0c8ejsn4e597722bd11",
      "useQueryString":true
      },"params":{
      "lat":`${lat}`,
      "lon":`${lon}`
      }
      })
      .then((response)=>{
        console.log(response.data)
        let trails = response.data
        return res.render("main/trails", {trails})
      })
      .catch((error)=>{
        console.log(error)
      })
    })
//     const result = await axios.get(url);
//     const day1Date = result.data.daily.data[0].time;
//     const day1Summary = result.data.daily.data[0].summary;
//     const day2Date = result.data.daily.data[1].time;
//     const day2Summary = result.data.daily.data[1].summary;
//     const day3Date = result.data.daily.data[2].time;
//     const day3Summary = result.data.daily.data[2].summary;
//     const day4Date = result.data.daily.data[3].time;
//     const day4Summary = result.data.daily.data[3].summary;
//     const day5Date = result.data.daily.data[4].time;
//     const day5Summary = result.data.daily.data[4].summary;
//     // const date = result.data.Date
//     let weatherReport = {};

//     // weatherReport.data.dataforEach(item=>{

//     // })
//     const currentDate = await Date.now();
//     weatherReport.date = currentDate;
//     weatherReport.day1Date = new Date(day1Date).toDateString();
//     weatherReport.day1Summary = day1Summary;
//     weatherReport.day2Date = new Date(day2Date).toDateString();
//     weatherReport.day2Summary = day2Summary;
//     weatherReport.day3Date = new Date(day3Date).toDateString();
//     weatherReport.day3Summary = day3Summary;
//     weatherReport.day4Date = new Date(day4Date).toDateString();
//     weatherReport.day4Summary = day4Summary;
//     weatherReport.day5Date = new Date(day5Date).toDateString();
//     weatherReport.day5Summary = day5Summary;
// console.log('weatherReport',req.body.zipCode)

//     await client.setex(`${zip}`,120,JSON.stringify(weatherReport))


//     return res.json({ message: '5 Day Weather report from db', weatherReport });
//     // res.render('weather',{weatherReport:JSON.stringify(weatherReport)})
//   } catch (error) {
//     next(error);
//   }
// })


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

router.get('/single-trail/:id', (req, res, next) => {
  Trail.findById({ _id: req.params.id }).then((foundTrail) => {
    return res.render('main/single-trail', { trail: foundTrail });
  });
});
module.exports = router;