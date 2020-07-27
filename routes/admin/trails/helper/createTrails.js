//add feature for user to add trial later...//




// const {waterfall} = require('async')

// const faker = require('faker')
// const Trail = require('../models/Trail')
// const Treasure = require('../../categories/models/Category');


// const createTreasure = (req, res, next) => {
//   const treasure = new Treasure();
//   treasure.id = req.body.id;
//   treasure.name = req.body.name;
//   treasure.description = req.body.description;
//   treasure.lat = req.body.lat;
//   treasure.lon = req.body.lon;
//   treasure
//     .save()
//     .then(() => {
//       waterfall([
//         (callback) =>{
//           Category.findOne({name:req.body.name},(err,category)=>{
//             if(err)return next(err)
//             callback(null,category)
//           })
//         },
//         (category)=>{
//           for(let i = 0;i<24;i++){
//             const trail = new Trail();
//             trail.category =  category._id
//             trail.name = faker.commerce.productName();
//             trail.price = faker.commerce.price();
//             trail.image = `/images/products2/${i}.jpg`;
//             trail.description = faker.lorem.paragraph();
//             trail.save();
    
//           }
//         }
//       ])
//       req.flash('messages', `Successfully added ${req.body.name} Zip and 24 trails`);
//       return res.redirect('/api/admin/add-category')
//       // return res.redirect('/api/admin/add-category');
//       // res.json({message:'Success',category:savedCategory})
//       // return res.redirect(`/api/admin/create-product/${savedCategory.name}`);
//     })
//     .catch((err) => {
//       if (err.code === 11000) {
//         req.flash('errors', 'Category exists');
//         return res.redirect('/api/admin/add-category');
//       } else {
//         return next(err);
//       }
//     });
// };

// module.exports = createTrail;






// const middleWare = new Promise((resolve, reject) => {
//   const createProducts = (req,res,next)=>{
//     const category = new Category();
//   category.name = req.body.name;
//   category
//     .save()
//     resolve();
//   }
// })
// .then((savedCategory) => {
//   throw new Error('Something failed');
//   waterfall([
//     (callback) =>{
//       Category.findOne(savedCategory.name,(err,category)=>{
//         if(err)return next(err)
//         callback(null,category)
//       })
//     },
//     (category)=>{
//       for(let i = 0;i<24;i++){
//         const product = new Product();
//         product.category =  category._id
//         product.name = faker.commerce.productName();
//         product.price = faker.commerce.price();
//         product.image = `/images/products2/${i}.jpg`;
//         product.description = faker.lorem.paragraph();
//         product.save();

//       }
//     }
//   ])
      
//   console.log('Do this');
// })
// .catch(() => {
//   console.error('Do that');
// })
// .then(() => {
//   console.log('Do this, no matter what happened before');
// });

// const category = new Category();
//   category.name = req.body.name;
//   category
//     .save()
//     .then((savedCategory) => {
//       waterfall([
//         (callback) =>{
//           Category.findOne(savedCategory.name,(err,category)=>{
//             if(err)return next(err)
//             callback(null,category)
//           })
//         },
//         (category)=>{
//           for(let i = 0;i<24;i++){
//             const product = new Product();
//             product.category =  category._id
//             product.name = faker.commerce.productName();
//             product.price = faker.commerce.price();
//             product.image = `/images/products2/${i}.jpg`;
//             product.description = faker.lorem.paragraph();
//             product.save();
    
//           }
//         }
//       ])
//       req.flash('messages', `Successfully added ${savedCategory.name} Category and 24 products`);
//       return res.redirect('/api/admin/add-category')
//       // return res.redirect('/api/admin/add-category');
//       // res.json({message:'Success',category:savedCategory})
//       // return res.redirect(`/api/admin/create-product/${savedCategory.name}`);
//     })