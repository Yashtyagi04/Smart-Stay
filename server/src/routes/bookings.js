const express = require('express');
const router = express.Router();
const { Booking, Listing } = require('../db');
const { authenticate } = require('../middleware/auth');

// Get bookings (filtered by user role)
router.get('/', authenticate, async (req, res) => {
  try {
    const user = req.user;
    let bookings = [];

    if (user.role === 'admin') {
      bookings = await Booking.find({});
    } else if (user.role === 'landlord') {
      // Landlord sees bookings for their listings
      const myProperties = await Listing.find({ ownerId: user.id });
      const myPropertyIds = myProperties.map(p => p._id || p.id);
      const allBookings = await Booking.find({});
      bookings = allBookings.filter(b => myPropertyIds.includes(b.listingId));
    } else {
      // Tenant sees their own bookings
      bookings = await Booking.find({ userId: user.id });
    }

    res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create new booking request
router.post('/', authenticate, async (req, res) => {
  try {
    const { 
      listingId, 
      sharingType = 'Double Sharing AC', 
      monthlyRent, 
      moveInDate, 
      durationMonths = 6, 
      message = '' 
    } = req.body;

    if (!listingId || !moveInDate || !monthlyRent) {
      return res.status(400).json({ success: false, message: 'Missing required booking fields.' });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Property listing not found.' });
    }

    const newBooking = await Booking.create({
      _id: 'bk_' + Date.now(),
      listingId,
      listingTitle: listing.title,
      listingAddress: listing.address,
      userId: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      userPhone: req.user.phone || '+91 98290 12345',
      sharingType,
      monthlyRent: Number(monthlyRent),
      moveInDate,
      durationMonths: Number(durationMonths),
      status: 'pending',
      message
    });

    res.status(201).json({
      success: true,
      message: 'Booking request sent to property manager successfully!',
      booking: newBooking
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update booking status (approve / reject / cancel)
router.patch('/:id/status', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid booking status.' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    const updated = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });

    res.json({
      success: true,
      message: `Booking has been ${status}.`,
      booking: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
