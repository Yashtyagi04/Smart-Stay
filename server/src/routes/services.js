const express = require('express');
const router = express.Router();
const { MaintenanceRequest } = require('../db');
const { authenticate } = require('../middleware/auth');

// Get all service / maintenance tickets
router.get('/', authenticate, async (req, res) => {
  try {
    const user = req.user;
    let requests = [];

    if (user.role === 'admin' || user.role === 'landlord') {
      requests = await MaintenanceRequest.find({});
    } else {
      requests = await MaintenanceRequest.find({ userId: user.id });
    }

    res.json({ success: true, count: requests.length, requests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create a new maintenance / service ticket
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      propertyTitle = 'Royal Palms Luxury Student Residency',
      roomNumber,
      category = 'Housekeeping / Cleaning',
      title,
      description,
      priority = 'Medium',
      preferredSlot = 'Tomorrow (10 AM - 1 PM)'
    } = req.body;

    if (!roomNumber || !title || !description) {
      return res.status(400).json({ success: false, message: 'Please provide room number, issue title, and description.' });
    }

    const newRequest = await MaintenanceRequest.create({
      _id: 'req_' + Date.now(),
      userId: req.user.id,
      userName: req.user.name,
      userPhone: req.user.phone || '+91 98290 12345',
      propertyTitle,
      roomNumber,
      category,
      title,
      description,
      priority,
      status: 'pending',
      preferredSlot,
      statusHistory: [
        {
          status: 'pending',
          timestamp: new Date(),
          note: `Ticket created by ${req.user.name}. Awaiting supervisor assignment.`
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Maintenance ticket created successfully!',
      request: newRequest
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update maintenance ticket status (Pending -> In Progress -> Resolved)
router.patch('/:id/status', authenticate, async (req, res) => {
  try {
    const { status, note = '' } = req.body;
    if (!['pending', 'in_progress', 'resolved'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid ticket status.' });
    }

    const ticket = await MaintenanceRequest.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Maintenance ticket not found.' });
    }

    const history = Array.isArray(ticket.statusHistory) ? [...ticket.statusHistory] : [];
    history.push({
      status,
      timestamp: new Date(),
      note: note || `Status updated to ${status.replace('_', ' ')} by ${req.user.name}`
    });

    const updated = await MaintenanceRequest.findByIdAndUpdate(req.params.id, {
      status,
      statusHistory: history
    }, { new: true });

    res.json({
      success: true,
      message: `Ticket status updated to ${status.replace('_', ' ')}.`,
      request: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
