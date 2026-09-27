const mongoose = require('mongoose');

const StatusHistorySchema = new mongoose.Schema({

  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  note: { type: String, default: '' }
}, { _id: false });

const MaintenanceRequestSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userPhone: { type: String, default: '' },
  propertyTitle: { type: String, required: true },
  roomNumber: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Plumbing', 'Electrical', 'High-Speed Wi-Fi', 'Housekeeping / Cleaning', 'Mess / Food', 'Air Conditioning', 'Carpentry', 'Security'], 
    default: 'Housekeeping / Cleaning' 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
  status: { type: String, enum: ['pending', 'in_progress', 'resolved'], default: 'pending' },
  preferredSlot: { type: String, default: 'Tomorrow Morning (10 AM - 1 PM)' },
  statusHistory: [StatusHistorySchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.MaintenanceRequest || mongoose.model('MaintenanceRequest', MaintenanceRequestSchema);
