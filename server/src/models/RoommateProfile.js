const mongoose = require('mongoose');

const RoommateProfileSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Non-Binary', 'Any'], default: 'Male' },
  age: { type: Number, default: 20 },
  college: { type: String, default: 'Manipal University Jaipur' },
  course: { type: String, default: 'B.Tech CSE (AIML)' },
  year: { type: String, default: '3rd Year' },
  budget: { type: Number, default: 10000 },
  preferredCity: { type: String, default: 'Jaipur' },
  sleepSchedule: { type: String, enum: ['Early Bird', 'Night Owl', 'Flexible'], default: 'Night Owl' },
  dietaryPreference: { type: String, enum: ['Vegetarian', 'Non-Vegetarian', 'Jain', 'Eggetarian'], default: 'Vegetarian' },
  smoking: { type: String, enum: ['Non-Smoker', 'Social', 'Smoker'], default: 'Non-Smoker' },
  drinking: { type: String, enum: ['Non-Drinker', 'Social', 'Drinker'], default: 'Non-Drinker' },
  cleanliness: { type: Number, min: 1, max: 5, default: 4 }, // 1 to 5 scale
  studyHabit: { type: String, enum: ['Silent Study', 'Group Study', 'Music in Background'], default: 'Silent Study' },
  hobbies: [{ type: String }],
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  phone: { type: String, default: '' },
  verifiedBadge: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.RoommateProfile || mongoose.model('RoommateProfile', RoommateProfileSchema);
