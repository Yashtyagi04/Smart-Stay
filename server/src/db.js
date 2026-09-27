const mongoose = require('mongoose');
const store = require('./store');
const UserMongo = require('./models/User');
const ListingMongo = require('./models/Listing');
const RoommateProfileMongo = require('./models/RoommateProfile');
const BookingMongo = require('./models/Booking');
const MaintenanceRequestMongo = require('./models/MaintenanceRequest');
const DigitalAgreementMongo = require('./models/DigitalAgreement');
const { 
  defaultUsers, 
  defaultListings, 
  defaultRoommates, 
  defaultBookings, 
  defaultMaintenance, 
  defaultAgreements 
} = require('./seedData');

let isConnectedToMongo = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartstay';
  try {
    // Attempt connecting with short timeout so server does not hang if mongod is absent
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    isConnectedToMongo = true;
    console.log('\x1b[32m%s\x1b[0m', '✅ [MongoDB] Connected successfully to live MongoDB at ' + uri);
    
    // Seed MongoDB if empty
    await seedMongoIfEmpty();
  } catch (err) {
    isConnectedToMongo = false;
    console.log('\x1b[33m%s\x1b[0m', '⚡ [Database Notice] MongoDB server not active locally (' + err.message + ').');
    console.log('\x1b[32m%s\x1b[0m', '✅ [Smart Store] Activated resilient persistent database store for seamless demo & presentation.');
  }
};

const seedMongoIfEmpty = async () => {
  try {
    const userCount = await UserMongo.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding MongoDB collections with authentic Smart Stay data...');
      await UserMongo.insertMany(defaultUsers);
      await ListingMongo.insertMany(defaultListings);
      await RoommateProfileMongo.insertMany(defaultRoommates);
      await BookingMongo.insertMany(defaultBookings);
      await MaintenanceRequestMongo.insertMany(defaultMaintenance);
      await DigitalAgreementMongo.insertMany(defaultAgreements);
      console.log('✅ MongoDB successfully pre-seeded with MUJ campus & national listings!');
    }
  } catch (seedErr) {
    console.warn('MongoDB seed warning:', seedErr.message);
  }
};

// Unified Model accessor that routes either to Mongoose or the Store
const getModel = (name, MongoModel) => {
  return {
    async find(filter = {}) {
      if (isConnectedToMongo) {
        return await MongoModel.find(filter).lean();
      }
      return await store.collection(name).find(filter);
    },

    async findById(id) {
      if (isConnectedToMongo) {
        return await MongoModel.findById(id).lean() || await MongoModel.findOne({ id }).lean();
      }
      return await store.collection(name).findById(id);
    },

    async findOne(filter = {}) {
      if (isConnectedToMongo) {
        return await MongoModel.findOne(filter).lean();
      }
      return await store.collection(name).findOne(filter);
    },

    async create(data) {
      if (isConnectedToMongo) {
        const item = new MongoModel(data);
        const saved = await item.save();
        return saved.toObject();
      }
      return await store.collection(name).create(data);
    },

    async findByIdAndUpdate(id, data, options = { new: true }) {
      if (isConnectedToMongo) {
        let updated = await MongoModel.findByIdAndUpdate(id, data, options).lean();
        if (!updated) {
          updated = await MongoModel.findOneAndUpdate({ id }, data, options).lean();
        }
        return updated;
      }
      return await store.collection(name).findByIdAndUpdate(id, data, options);
    },

    async findByIdAndDelete(id) {
      if (isConnectedToMongo) {
        let deleted = await MongoModel.findByIdAndDelete(id).lean();
        if (!deleted) {
          deleted = await MongoModel.findOneAndDelete({ id }).lean();
        }
        return deleted;
      }
      return await store.collection(name).findByIdAndDelete(id);
    },

    async countDocuments(filter = {}) {
      if (isConnectedToMongo) {
        return await MongoModel.countDocuments(filter);
      }
      const all = await store.collection(name).find(filter);
      return all.length;
    }
  };
};

const Models = {
  User: getModel('users', UserMongo),
  Listing: getModel('listings', ListingMongo),
  RoommateProfile: getModel('roommates', RoommateProfileMongo),
  Booking: getModel('bookings', BookingMongo),
  MaintenanceRequest: getModel('maintenance', MaintenanceRequestMongo),
  DigitalAgreement: getModel('agreements', DigitalAgreementMongo),
  isLiveMongo: () => isConnectedToMongo
};

module.exports = {
  connectDB,
  ...Models
};
