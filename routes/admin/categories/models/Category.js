const mongoose = require('mongoose');

const TreasureSchema = new mongoose.Schema({
  id:{type: String, lowercase: true, required: true},
  location: { type: String, lowercase: true, },
  description:{type: String, lowercase: true, required: true},
  lat:{type:Number,required:true},
  lon:{type:Number,required:true},
});
module.exports = mongoose.model('Treasure', TreasureSchema);
