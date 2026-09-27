const express = require('express');
const router = express.Router();
const { Listing } = require('../db');
const { authenticate, optionalAuth, authorize } = require('../middleware/auth');

// Get all listings with rich filtering & search
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { 
      city, 
      type, 
      gender, 
      minPrice, 
      maxPrice, 
      amenity, 
      search, 
      sortBy = 'newest',
      all
    } = req.query;

    let listings = await Listing.find({});

    // Filter unverified listings for public feed
    if (all !== 'true') {
      listings = listings.filter(l => l.isVerified);
    }

    // Filter by city
    if (city && city !== 'All') {
      listings = listings.filter(l => l.city.toLowerCase() === city.toLowerCase());
    }

    // Filter by property type (PG, Hostel, Flat)
    if (type && type !== 'All') {
      listings = listings.filter(l => l.propertyType.toLowerCase() === type.toLowerCase());
    }

    // Filter by gender suitability
    if (gender && gender !== 'All') {
      listings = listings.filter(l => l.genderSuitability.toLowerCase() === gender.toLowerCase() || l.genderSuitability === 'Co-ed');
    }

    // Filter by min price
    if (minPrice) {
      const min = Number(minPrice);
      listings = listings.filter(l => l.price >= min);
    }

    // Filter by max price
    if (maxPrice) {
      const max = Number(maxPrice);
      listings = listings.filter(l => l.price <= max);
    }

    // Filter by specific amenity
    if (amenity && amenity !== 'All') {
      listings = listings.filter(l => l.amenities && l.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase())));
    }

    // Keyword search (title, address, landmark, description)
    if (search) {
      const q = search.toLowerCase();
      listings = listings.filter(l => 
        (l.title && l.title.toLowerCase().includes(q)) ||
        (l.description && l.description.toLowerCase().includes(q)) ||
        (l.address && l.address.toLowerCase().includes(q)) ||
        (l.city && l.city.toLowerCase().includes(q)) ||
        (l.landmark && l.landmark.toLowerCase().includes(q))
      );
    }

    // Sort listings
    if (sortBy === 'price-low') {
      listings.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      listings.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      listings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      // Default: highest rating
      listings.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    res.json({
      success: true,
      count: listings.length,
      listings
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch listings: ' + err.message });
  }
});

// Get properties owned by the logged-in landlord
router.get('/my-properties', authenticate, authorize('landlord', 'admin'), async (req, res) => {
  try {
    const listings = await Listing.find({ ownerId: req.user.id });
    res.json({
      success: true,
      count: listings.length,
      listings
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch your properties: ' + err.message });
  }
});

// Compare multiple listings side-by-side
router.post('/compare', async (req, res) => {
  try {
    const { ids = [] } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide an array of listing IDs to compare.' });
    }

    const items = [];
    for (const id of ids) {
      const item = await Listing.findById(id);
      if (item) items.push(item);
    }

    res.json({ success: true, count: items.length, listings: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found.' });
    }
    res.json({ success: true, listing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create new listing (Landlord or Admin)
router.post('/', authenticate, async (req, res) => {
  try {
    const user = req.user;
    const {
      title,
      description,
      propertyType = 'PG',
      genderSuitability = 'Co-ed',
      city,
      address,
      landmark = '',
      lat = 26.8439,
      lng = 75.5652,
      price,
      deposit = 10000,
      sharingTypes,
      amenities = [],
      foodIncluded = true,
      mealPlan = '',
      rules = [],
      images = [],
      curfewTime = '10:30 PM',
      distanceToCampus = 'Close to university campus'
    } = req.body;

    if (!title || !description || !city || !address || !price) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields (title, description, city, address, price).' });
    }

    const fallbackImages = [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ];

    const listingId = 'lst_' + Math.random().toString(36).substr(2, 9);
    
    const newListing = await Listing.create({
      _id: listingId,
      title,
      description,
      ownerId: user.id,
      ownerName: user.name,
      ownerPhone: user.phone || '+91 98765 43210',
      ownerEmail: user.email,
      propertyType,
      genderSuitability,
      city,
      address,
      landmark,
      lat: Number(lat) || 26.8439,
      lng: Number(lng) || 75.5652,
      price: Number(price),
      deposit: Number(deposit),
      sharingTypes: sharingTypes && sharingTypes.length ? sharingTypes : [
        { type: 'Single Room', price: Number(price) * 1.5, available: true },
        { type: 'Double Sharing', price: Number(price), available: true }
      ],
      amenities: amenities.length ? amenities : ['High-Speed Wi-Fi', 'Air Conditioning', 'Power Backup', 'Meals Included'],
      foodIncluded,
      mealPlan: mealPlan || (foodIncluded ? 'Breakfast, lunch, and dinner provided daily' : 'Self cooking facility available'),
      rules: rules.length ? rules : ['Standard hostel discipline rules apply', 'Night entry before curfew'],
      images: images.length ? images : fallbackImages,
      rating: 4.8,
      reviewCount: 1,
      isVerified: user.role === 'admin',
      status: 'available',
      curfewTime,
      distanceToCampus
    });

    res.status(201).json({
      success: true,
      message: 'Property listing created successfully!',
      listing: newListing
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create listing: ' + err.message });
  }
});

// Update listing
router.put('/:id', authenticate, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    if (listing.ownerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized. You can only edit your own listings.' });
    }

    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Listing updated successfully', listing: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete listing
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    if (listing.ownerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized.' });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Listing removed successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
