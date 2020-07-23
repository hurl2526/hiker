const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      name: String,
      image: String,
      city: String,
      lat: String,
      lon: String,
      description: String,
      }
  ]
});
module.exports = mongoose.model('Fav', FavSchema);