require('dotenv').config();
const mongoose = require('mongoose');
const { defaultListings } = require('./src/seedData');
const ListingMongo = require('./src/models/Listing');

const forceSeed = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartstay';
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('Connected to MongoDB at ' + uri);
    
    await ListingMongo.deleteMany({});
    console.log('Cleared existing listings in MongoDB.');

    await ListingMongo.insertMany(defaultListings);
    console.log(`Successfully inserted ${defaultListings.length} listings into MongoDB.`);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding MongoDB:', err);
    process.exit(1);
  }
};

forceSeed();
