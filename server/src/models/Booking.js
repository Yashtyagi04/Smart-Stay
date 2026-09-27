const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  listingId: { type: String, required: true },
  listingTitle: { type: String, required: true },
  listingAddress: { type: String, default: '' },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: String, default: '' },
  sharingType: { type: String, default: 'Double' },
  monthlyRent: { type: Number, required: true },
  moveInDate: { type: String, required: true },
  durationMonths: { type: Number, default: 6 },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed'], default: 'pending' },
  message: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
