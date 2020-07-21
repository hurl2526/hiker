const mongoose = require('mongoose');

const TreasureSchema = new mongoose.Schema({
  id:{type: String, unique: true, lowercase: true, required: true},
  name: { type: String, unique: true, lowercase: true, required: true },
  description:{type: String, lowercase: true, required: true},
  lat:{type:Number,required:true},
  lon:{type:Number,required:true},
});
module.exports = mongoose.model('Treasure', TreasureSchema);
