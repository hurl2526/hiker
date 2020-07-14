const mongoose = require('mongoose');

const TrailSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  name: String,
  image: String,
  description: String,
});
module.exports = mongoose.model('Trail', TrailSchema);