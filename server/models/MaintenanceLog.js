const mongoose = require('mongoose');

const MaintenanceLogSchema = new mongoose.Schema({
  registration: { type: String, required: true },
  date: { type: String, required: true },
  technician: { type: String, required: true },
  description: { type: String, required: true },
  hours: { type: Number, required: true },
  comments: [{
    text: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdBy: { type: String },
  updatedBy: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('MaintenanceLog', MaintenanceLogSchema);
