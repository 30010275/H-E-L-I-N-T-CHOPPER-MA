const mongoose = require('mongoose');

const HelicopterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  imageUrl: { type: String },
  capacity: { type: Number, required: true },
  status: { type: String, enum: ['active', 'maintenance', 'grounded'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Helicopter', HelicopterSchema);
