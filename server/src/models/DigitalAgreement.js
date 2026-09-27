const mongoose = require('mongoose');

const DigitalAgreementSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  listingId: { type: String, required: true },
  listingTitle: { type: String, required: true },
  landlordId: { type: String, required: true },
  landlordName: { type: String, required: true },
  tenantId: { type: String, required: true },
  tenantName: { type: String, required: true },
  tenantAadhaar: { type: String, default: 'XXXX-XXXX-7842' },
  monthlyRent: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  lockinPeriodMonths: { type: Number, default: 6 },
  startDate: { type: String, required: true },
  status: { type: String, enum: ['draft', 'pending_signature', 'signed'], default: 'pending_signature' },
  tenantSignature: { type: String, default: '' },
  signedAt: { type: Date },
  termsAccepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.DigitalAgreement || mongoose.model('DigitalAgreement', DigitalAgreementSchema);
