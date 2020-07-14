const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      item:{type:Schema.Types.ObjectId,ref:'Trail'},
      // quantity:{type:Number,default:1},
      // price:{type:Number,default:0}
      }
  ]
});
module.exports = mongoose.model('Fav', FavSchema);