const express = require('express');
const router = express.Router();
const { RoommateProfile } = require('../db');
const { authenticate, optionalAuth } = require('../middleware/auth');

// Helper: Calculate compatibility score between two sets of preferences
const calculateCompatibility = (userPref, candidate) => {
  let score = 0;
  const breakdown = [];

  // 1. Budget Compatibility (max 25 pts)
  if (userPref.budget && candidate.budget) {
    const diff = Math.abs(userPref.budget - candidate.budget);
    if (diff <= 1000) {
      score += 25;
      breakdown.push({ label: 'Budget', match: 'Excellent', points: 25, reason: 'Budgets are closely matched' });
    } else if (diff <= 2500) {
      score += 18;
      breakdown.push({ label: 'Budget', match: 'Good', points: 18, reason: 'Budgets are compatible within ₹2500' });
    } else if (diff <= 5000) {
      score += 10;
      breakdown.push({ label: 'Budget', match: 'Moderate', points: 10, reason: 'Slight budget variance' });
    } else {
      score += 5;
      breakdown.push({ label: 'Budget', match: 'Low', points: 5, reason: 'Significant budget gap' });
    }
  } else {
    score += 15;
  }

  // 2. Sleep Schedule (max 20 pts)
  if (userPref.sleepSchedule && candidate.sleepSchedule) {
    if (userPref.sleepSchedule === candidate.sleepSchedule) {
      score += 20;
      breakdown.push({ label: 'Sleep Rhythm', match: 'Perfect', points: 20, reason: `Both are ${userPref.sleepSchedule}s` });
    } else if (userPref.sleepSchedule === 'Flexible' || candidate.sleepSchedule === 'Flexible') {
      score += 15;
      breakdown.push({ label: 'Sleep Rhythm', match: 'Flexible', points: 15, reason: 'One party has flexible sleep hours' });
    } else {
      score += 5;
      breakdown.push({ label: 'Sleep Rhythm', match: 'Different', points: 5, reason: 'Opposite sleeping schedules' });
    }
  } else {
    score += 15;
  }

  // 3. Dietary Preference (max 20 pts)
  if (userPref.dietaryPreference && candidate.dietaryPreference) {
    if (userPref.dietaryPreference === candidate.dietaryPreference) {
      score += 20;
      breakdown.push({ label: 'Dietary Preference', match: 'Identical', points: 20, reason: `Both prefer ${userPref.dietaryPreference} food` });
    } else if (
      (userPref.dietaryPreference === 'Vegetarian' && candidate.dietaryPreference === 'Jain') ||
      (userPref.dietaryPreference === 'Jain' && candidate.dietaryPreference === 'Vegetarian') ||
      (userPref.dietaryPreference === 'Eggetarian' && candidate.dietaryPreference === 'Vegetarian')
    ) {
      score += 16;
      breakdown.push({ label: 'Dietary Preference', match: 'Compatible', points: 16, reason: 'Harmonious vegetarian dietary habits' });
    } else {
      score += 8;
      breakdown.push({ label: 'Dietary Preference', match: 'Diverse', points: 8, reason: 'Different culinary preferences' });
    }
  } else {
    score += 15;
  }

  // 4. Cleanliness Level (max 15 pts)
  if (userPref.cleanliness && candidate.cleanliness) {
    const diff = Math.abs(userPref.cleanliness - candidate.cleanliness);
    if (diff === 0) {
      score += 15;
      breakdown.push({ label: 'Cleanliness', match: 'Identical', points: 15, reason: `Identical hygiene standard (${candidate.cleanliness}/5)` });
    } else if (diff === 1) {
      score += 12;
      breakdown.push({ label: 'Cleanliness', match: 'Close', points: 12, reason: 'Very similar cleanliness expectations' });
    } else {
      score += 6;
      breakdown.push({ label: 'Cleanliness', match: 'Moderate', points: 6, reason: 'Different housekeeping tolerance' });
    }
  } else {
    score += 10;
  }

  // 5. Study Habit (max 10 pts)
  if (userPref.studyHabit && candidate.studyHabit) {
    if (userPref.studyHabit === candidate.studyHabit) {
      score += 10;
      breakdown.push({ label: 'Study Routine', match: 'Aligned', points: 10, reason: `Both thrive in ${userPref.studyHabit}` });
    } else {
      score += 5;
      breakdown.push({ label: 'Study Routine', match: 'Adjustable', points: 5, reason: 'Adaptable study routines' });
    }
  } else {
    score += 8;
  }

  // 6. Common Hobbies Overlap (max 10 pts)
  if (Array.isArray(userPref.hobbies) && Array.isArray(candidate.hobbies)) {
    const common = candidate.hobbies.filter(h => userPref.hobbies.includes(h));
    if (common.length >= 2) {
      score += 10;
      breakdown.push({ label: 'Shared Interests', match: 'Great', points: 10, reason: `Shared interests in: ${common.join(', ')}` });
    } else if (common.length === 1) {
      score += 7;
      breakdown.push({ label: 'Shared Interests', match: 'Good', points: 7, reason: `Common interest in: ${common[0]}` });
    } else {
      score += 4;
    }
  }

  // Normalize score between 40 and 99%
  const finalPercentage = Math.min(99, Math.max(45, Math.round(score)));
  return { percentage: finalPercentage, breakdown };
};

// Get all roommate profiles
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { city, gender, college } = req.query;
    let profiles = await RoommateProfile.find({});

    if (city && city !== 'All') {
      profiles = profiles.filter(p => p.preferredCity && p.preferredCity.toLowerCase() === city.toLowerCase());
    }

    if (gender && gender !== 'All') {
      profiles = profiles.filter(p => p.gender && p.gender.toLowerCase() === gender.toLowerCase());
    }

    if (college && college !== 'All') {
      profiles = profiles.filter(p => p.college && p.college.toLowerCase().includes(college.toLowerCase()));
    }

    res.json({ success: true, count: profiles.length, profiles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Run AI-assisted roommate matching algorithm based on interactive user preferences
router.post('/match', async (req, res) => {
  try {
    const userPrefs = req.body; // { budget, sleepSchedule, dietaryPreference, cleanliness, studyHabit, hobbies, gender }
    const profiles = await RoommateProfile.find({});

    const matches = profiles.map(profile => {
      const { percentage, breakdown } = calculateCompatibility(userPrefs, profile);
      return {
        ...profile,
        matchScore: percentage,
        breakdown
      };
    });

    // Sort by highest compatibility score first
    matches.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      success: true,
      count: matches.length,
      topMatch: matches[0] || null,
      matches
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Roommate matching calculation error: ' + err.message });
  }
});

// Create or update user's own roommate profile
router.post('/profile', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const existing = await RoommateProfile.findOne({ userId });

    if (existing) {
      const updated = await RoommateProfile.findByIdAndUpdate(existing._id, {
        ...req.body,
        name: req.user.name,
        userId
      }, { new: true });
      return res.json({ success: true, message: 'Roommate profile updated successfully!', profile: updated });
    }

    const created = await RoommateProfile.create({
      _id: 'rm_' + Date.now(),
      ...req.body,
      userId,
      name: req.user.name,
      avatar: req.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(req.user.name)}`,
      verifiedBadge: true
    });

    res.status(201).json({ success: true, message: 'Roommate profile created successfully!', profile: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
