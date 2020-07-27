const mongoose = require('mongoose');

const TrailSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});
module.exports = mongoose.model('Trail', TrailSchema);