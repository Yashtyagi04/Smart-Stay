const express = require('express');
const router = express.Router();
const { DigitalAgreement } = require('../db');
const { authenticate } = require('../middleware/auth');

// Get agreements for current user
router.get('/', authenticate, async (req, res) => {
  try {
    const user = req.user;
    let agreements = [];

    if (user.role === 'admin') {
      agreements = await DigitalAgreement.find({});
    } else if (user.role === 'landlord') {
      agreements = await DigitalAgreement.find({ landlordId: user.id });
    } else {
      agreements = await DigitalAgreement.find({ tenantId: user.id });
    }

    res.json({ success: true, count: agreements.length, agreements });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create new agreement draft
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      listingId = 'lst_101',
      listingTitle = 'Royal Palms Luxury Student Residency',
      landlordName = 'Rajesh Sharma',
      monthlyRent = 9500,
      securityDeposit = 15000,
      startDate = new Date().toISOString().split('T')[0],
      durationMonths = 6,
      tenantAadhaar = 'XXXX-XXXX-6721'
    } = req.body;

    const agreement = await DigitalAgreement.create({
      _id: 'agr_' + Date.now(),
      listingId,
      listingTitle,
      landlordId: req.user.role === 'landlord' ? req.user.id : 'usr_002',
      landlordName: req.user.role === 'landlord' ? req.user.name : landlordName,
      tenantId: req.user.id,
      tenantName: req.user.name,
      tenantAadhaar,
      monthlyRent: Number(monthlyRent),
      securityDeposit: Number(securityDeposit),
      lockinPeriodMonths: Number(durationMonths),
      startDate,
      status: 'pending_signature',
      termsAccepted: false
    });

    res.status(201).json({
      success: true,
      message: 'Rental agreement created and ready for digital signing.',
      agreement
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Sign agreement
router.post('/:id/sign', authenticate, async (req, res) => {
  try {
    const { signature } = req.body; // base64 or drawn svg signature
    if (!signature) {
      return res.status(400).json({ success: false, message: 'Digital signature is required.' });
    }

    const agreement = await DigitalAgreement.findById(req.params.id);
    if (!agreement) {
      return res.status(404).json({ success: false, message: 'Agreement not found.' });
    }

    const updated = await DigitalAgreement.findByIdAndUpdate(req.params.id, {
      status: 'signed',
      tenantSignature: signature,
      signedAt: new Date(),
      termsAccepted: true
    }, { new: true });

    res.json({
      success: true,
      message: 'Agreement digitally signed & certified successfully!',
      agreement: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
