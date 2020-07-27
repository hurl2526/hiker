const router = require('express').Router();
const Trail = require('./models/Trail');
const axios = require('axios');
const Fav = require('../../fav/models/Fav');
const Treasure = require('../../admin/treasures/models/Treasure');
const riddles = require('../../admin/trails/helper/riddles');
const checkTreasure = require('../treasures/utils/checkTreasure');

router.get('/riddle/:trailId', (req, res, next) => {
  let trailId = req.params.trailId;
  let oneRiddle = riddles[Math.floor(Math.random() * riddles.length)];
  res.render('main/riddles', { oneRiddle, trailId });
});
router.post('/riddle/:trailId/:riddleId', (req, res, next) => {
  let trailId = req.params.trailId;
  let ridId = req.params.riddleId;
  let answer = req.body.answer;
  let riddle = riddles.filter((riddle) => {
    return riddle.id.toString() === ridId.toString();
  });
  if (answer.toLowerCase() === riddle[0].answer || riddle[0].answer2) {
    res.redirect(`/api/trails/show-treasure/${trailId}`);
  } else {
    res.redirect(`/api/trails/riddle/${trailId}`);
  }
});
router.get('/show-treasure/:id', (req, res, next) => {
  Treasure.find({ id: req.params.id }).then((results) => {
    console.log(results);
    return res.render('main/show-treasure', { results });
  });
});
router.get('/add-treasure/:id/:lat/:lon', (req, res, next) => {
  let id = req.params.id;
  let lat = req.params.lat;
  let lon = req.params.lon;
  return res.render('main/add-treasure', { id, lat, lon });
});
router.post('/add-treasure/:id/:lat/:lon', (req, res, next) => {
  let id = req.params.id;
  let lat = req.params.lat;
  let lon = req.params.lon;
  const treasure = new Treasure();
  treasure.id = id;
  treasure.location = req.body.location;
  treasure.description = req.body.description;
  treasure.lat = lat;
  treasure.lon = lon;
  treasure.save().then(() => {
    req.flash('messages', `Successfully added ${req.body.name} to this trail`);
    return res.render('main/success',{lat, lon});
  });
});
router.get('/single-trail/:lat/:lon/:allLat/:allLon', (req, res, next) => {
  let lat = req.params.lat;
  let lon = req.params.lon;
  const { allLat, allLon } = req.params;
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
      page: '1',
      per_page: '1',
      radius: '1 miles',
      lat: `${lat}`,
      lon: `${lon}`,
    },
  })
    .then((response) => {
      console.log(response.data);
      let trails = response.data;
      return res.render('main/single-trail', { trails, allLat, allLon });
    })
    .catch((error) => {
      console.log(error);
    });
});
router.get('/save/single-trail/:lat/:lon/:allLat/:allLon', (req, res, next) => {
  console.log('header', res.header());
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
      page: '1',
      per_page: '1',
      radius: '1 miles',
      lat: `${lat}`,
      lon: `${lon}`,
    },
  })
    .then((response) => {
      let foundTrails = response.data;
      Fav.findOne({ owner: req.user._id }).then((favorite) => {
        const trail = {
          name: foundTrails.data[0].name,
          city: foundTrails.data[0].city,
          lat: foundTrails.data[0].lat,
          lon: foundTrails.data[0].lon,
          image: foundTrails.data[0].thumbnail,
          description: foundTrails.data[0].description,
        };
        favorite.items.push(trail);
        // console.log("this is trail",trail)
        favorite.save();
      });
      // console.log(response.data);
      // let trails = response.data;
      req.flash(
        'messages',
        `Successfully added ${foundTrails.data[0].name} to your favorites list! `
      );
      return res.render('main/single-trail-saved', {
        foundTrails,
        allLat: req.params.allLat,
        allLon: req.params.allLon,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
// console.log("data:",response.data)
// let newFav= new Fav()
// newFav.owner = req.user._i
// Trail.findById({ _id: req.params.id }).then((foundTrail) => {
//   return res.render('main/single-trail', { trail: foundTrail });
// });
// return res.send('hello');
// return res.render('main/single-trail');
// });
//new api
router.get('/:zip', async (req, res, next) => {
  console.log('hello zip');
  try {
    const api =
      'yaY02DcVxoZepInXaCW4dADQXEbZiu4UuDQA9Z8GgcVSMOoyF9QC3zrZwWSnt2mY';
    const zip = req.params.zip;
    console.log(zip);
    const url = `https://www.zipcodeapi.com/rest/${api}/info.json/${zip}/degrees`;
    const info = await axios.get(url);
    const lat = info.data.lat;
    const lon = info.data.lng;
    console.log('res loacals', res.locals);
    return res.redirect(`all/${lat}/${lon}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.get('/all/:lat/:lon', function (req, res, next) {
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
      lat: lat,
      lon: lon,
      useQueryString: true,
    },
    params: {
      page: '1',
      per_page: '6',
      radius: '50 miles',
      lat: `${lat}`,
      lon: `${lon}`,
    },
  })
    .then((response) => {
      // console.log(response);
      let trails = response.data;
      return res.render('main/trails', { trails, allLat: lat, allLon: lon });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
