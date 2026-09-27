const mongoose = require('mongoose');

const SharingOptionSchema = new mongoose.Schema({

  type: { type: String, required: true }, // 'Single', 'Double', 'Triple', 'Flat'
  price: { type: Number, required: true },
  available: { type: Boolean, default: true }
}, { _id: false });

const ListingSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  ownerId: { type: String, required: true },
  ownerName: { type: String, default: 'Hostel Manager' },
  ownerPhone: { type: String, default: '+91 98765 43210' },
  ownerEmail: { type: String, default: 'landlord@smartstay.com' },
  propertyType: { type: String, enum: ['PG', 'Hostel', 'Flat'], default: 'PG' },
  genderSuitability: { type: String, enum: ['Boys', 'Girls', 'Co-ed'], default: 'Co-ed' },
  city: { type: String, required: true },
  address: { type: String, required: true },
  landmark: { type: String, default: '' },
  lat: { type: Number, default: 26.8439 },
  lng: { type: Number, default: 75.5652 },
  price: { type: Number, required: true }, // Starting monthly rent in INR
  deposit: { type: Number, default: 10000 },
  sharingTypes: [SharingOptionSchema],
  amenities: [{ type: String }],
  foodIncluded: { type: Boolean, default: true },
  mealPlan: { type: String, default: '3 times hygienic meals (North & South Indian vegetarian menu)' },
  rules: [{ type: String }],
  images: [{ type: String }],
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 12 },
  isVerified: { type: Boolean, default: true },
  status: { type: String, enum: ['available', 'occupied'], default: 'available' },
  curfewTime: { type: String, default: '10:30 PM' },
  distanceToCampus: { type: String, default: '1.2 km from MUJ' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Listing || mongoose.model('Listing', ListingSchema);
