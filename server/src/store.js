const fs = require('fs');
const path = require('path');
const { 
  defaultUsers, 
  defaultListings, 
  defaultRoommates, 
  defaultBookings, 
  defaultMaintenance, 
  defaultAgreements 
} = require('./seedData');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'smartstay.json');

class SmartStore {
  constructor() {
    this.data = {
      users: [],
      listings: [],
      roommates: [],
      bookings: [],
      maintenance: [],
      agreements: []
    };
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DATA_FILE)) {
        const content = fs.readFileSync(DATA_FILE, 'utf8');
        this.data = JSON.parse(content);
      } else {
        this.seed();
      }
    } catch (err) {
      console.warn('Initializing in-memory store due to file read error:', err.message);
      this.seed();
    }
  }

  seed() {
    this.data = {
      users: [...defaultUsers],
      listings: [...defaultListings],
      roommates: [...defaultRoommates],
      bookings: [...defaultBookings],
      maintenance: [...defaultMaintenance],
      agreements: [...defaultAgreements]
    };
    this.save();
  }

  save() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving store to disk:', err.message);
    }
  }

  // Model emulation
  collection(name) {
    const self = this;
    if (!self.data[name]) self.data[name] = [];

    return {
      async find(filter = {}) {
        return self.data[name].filter(item => {
          for (let key in filter) {
            if (filter[key] !== undefined && item[key] !== filter[key]) return false;
          }
          return true;
        });
      },

      async findById(id) {
        return self.data[name].find(item => item._id === id || item.id === id) || null;
      },

      async findOne(filter = {}) {
        const results = await this.find(filter);
        return results[0] || null;
      },

      async create(doc) {
        const id = doc._id || doc.id || `${name.slice(0, 3)}_${Date.now()}`;
        const newDoc = {
          _id: id,
          id: id,
          ...doc,
          createdAt: doc.createdAt || new Date()
        };
        self.data[name].unshift(newDoc);
        self.save();
        return newDoc;
      },

      async findByIdAndUpdate(id, update, options = {}) {
        const idx = self.data[name].findIndex(item => item._id === id || item.id === id);
        if (idx === -1) return null;
        
        const existing = self.data[name][idx];
        const updated = { ...existing, ...update };
        self.data[name][idx] = updated;
        self.save();
        return updated;
      },

      async findByIdAndDelete(id) {
        const idx = self.data[name].findIndex(item => item._id === id || item.id === id);
        if (idx === -1) return null;
        const deleted = self.data[name].splice(idx, 1)[0];
        self.save();
        return deleted;
      }
    };
  }
}

const store = new SmartStore();

module.exports = store;
