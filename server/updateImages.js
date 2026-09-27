const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const seedDataPath = path.join(__dirname, 'src', 'seedData.js');
let seedData = fs.readFileSync(seedDataPath, 'utf8');

// The image pool
const imagePool = [
  '1522708323590-d24dbb6b0267', '1502672260266-1c1ef2d93688', '1493809842364-78817add7ffb',
  '1560448204-e02f11c3d0e2', '1540518614846-7ede433c4550', '1598928506311-c55ded91a20c',
  '1505693416388-ac5ce068fe85', '1502005229762-ee152da92e06', '1560185007-cde436f6a4d0',
  '1484154218962-a197022b5858', '1512917774080-9991f1c4c750', '1522771739844-6a9f6d5f14af',
  '1555854877-bab0e564b8d5', '1583847268964-b28dc8f51f92', '1596276020587-8044fe049813',
  '1513694203232-719a280e022f', '1513161455079-7dc7321523b1', '1497367375252-fb5596395b00',
  '1507089947368-19c1da9775ce', '1534438327276-14e5300c3a48', '1522794825942-d60920d36402',
  '1460317442991-0ec209397118', '1515263487990-61b07816b324'
];

// Helper to shuffle and pick 2-3 random images
function getRandomImages() {
  const shuffled = [...imagePool].sort(() => 0.5 - Math.random());
  const num = Math.floor(Math.random() * 2) + 2; // 2 or 3 images
  const picked = shuffled.slice(0, num);
  return picked.map(id => `'https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80'`);
}

// 1. Remove the old professional listings from seedData.js
const badStart = seedData.indexOf(`  {
    _id: 'lst_pro_0',`);

if (badStart !== -1) {
  let beforeBad = seedData.substring(0, badStart);
  if (beforeBad.endsWith(',\n')) {
    beforeBad = beforeBad.slice(0, -2);
  } else if (beforeBad.endsWith(',')) {
    beforeBad = beforeBad.slice(0, -1);
  }
  
  const roommatesStart = seedData.indexOf('const defaultRoommates = [');
  seedData = beforeBad + '\n];\n\n' + seedData.substring(roommatesStart);
}

// 2. Generate new 20 listings with dynamic images
const generateProfessionalListings = (count) => {
  const types = ['Hostel', 'PG', 'Flat'];
  const genders = ['Boys', 'Girls', 'Co-ed'];
  const names = [
    'Oxford Elite Residence', 'Stanza Living - Orion House', 'Zolo Amber', 'MyPlace Student Housing',
    'Nestaway Premium Suites', 'Urban Haven Living', 'Campus View Apartments', 'The Scholar House',
    'Oasis Girls Hostel', 'Apex Boys Residency', 'Comfort Stay Co-Living', 'Horizon Student PG',
    'Greenfield Flats', 'The Summit Residency', 'Cityscape Student Homes', 'Trinity Rooms',
    'Nova Premium Housing', 'Crescent Moon PG', 'Vibrant Co-Living', 'Serenity Studios'
  ];
  const addresses = [
    'Plot 45, Knowledge Park, Jaipur', 'Sector 5, University Road, Bangalore', 'C-Block, Scholar Avenue, Delhi',
    'Ring Road 3, Near Campus Gate, Kota', 'A-12, Elite Layout, Jaipur', '#405, Silicon Valley, Bangalore',
    'Phase 2, Vasant Vihar, Delhi', 'Student Colony, Station Road, Kota'
  ];
  
  const listings = [];
  
  for (let i = 0; i < count; i++) {
    const type = types[i % 3];
    const gender = genders[i % 3];
    const city = addresses[i % 8].split(',').pop().trim();
    const address = addresses[i % 8];
    const title = names[i];
    
    let lat, lng;
    if (city === 'Jaipur') { lat = 26.8439 + (Math.random() - 0.5) * 0.05; lng = 75.5652 + (Math.random() - 0.5) * 0.05; }
    else if (city === 'Bangalore') { lat = 12.9716 + (Math.random() - 0.5) * 0.05; lng = 77.5946 + (Math.random() - 0.5) * 0.05; }
    else if (city === 'Delhi') { lat = 28.7041 + (Math.random() - 0.5) * 0.05; lng = 77.1025 + (Math.random() - 0.5) * 0.05; }
    else { lat = 25.1814 + (Math.random() - 0.5) * 0.05; lng = 75.8322 + (Math.random() - 0.5) * 0.05; }
    
    const price = Math.floor(6000 + Math.random() * 8000);
    const deposit = price * 2;
    const imagesArrayStr = getRandomImages().join(',\n      ');
    
    listings.push(`
  {
    _id: 'lst_pro_${i}',
    id: 'lst_pro_${i}',
    title: '${title}',
    description: 'Experience premium student and professional living at ${title}. Fully furnished ${type} with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: '${type}',
    genderSuitability: '${gender}',
    city: '${city}',
    address: '${address}',
    landmark: 'Near Central Station',
    lat: ${lat.toFixed(4)},
    lng: ${lng.toFixed(4)},
    price: ${price},
    deposit: ${deposit},
    sharingTypes: [
      { type: 'Single Premium', price: ${price + 3000}, available: true },
      { type: 'Double Sharing', price: ${price}, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: ${i % 2 === 0},
    mealPlan: '${i % 2 === 0 ? 'Delicious 3-time meals served fresh' : 'Shared fully-equipped kitchen available'}',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      ${imagesArrayStr}
    ],
    rating: ${(4.2 + (Math.random() * 0.8)).toFixed(1)},
    reviewCount: ${Math.floor(10 + Math.random() * 50)},
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '${Math.floor(100 + Math.random() * 2000)} meters',
    createdAt: new Date()
  }`);
  }
  
  return listings.join(',');
};

const professionalListings = generateProfessionalListings(20);
const targetPattern = /}\n];\n\nconst defaultRoommates = \[/;

if (seedData.match(targetPattern)) {
  seedData = seedData.replace(targetPattern, '},' + professionalListings + '\n];\n\nconst defaultRoommates = [');
  fs.writeFileSync(seedDataPath, seedData);
  console.log('Updated seedData.js with varied images.');
} else {
  console.log('Could not find target pattern in seedData.js');
}

// 3. Sync with MongoDB
require('dotenv').config();
const { defaultListings } = require('./src/seedData');
const ListingMongo = require('./src/models/Listing');

const forceSeed = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartstay';
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB.');
    await ListingMongo.deleteMany({});
    console.log('Cleared existing listings.');
    await ListingMongo.insertMany(defaultListings);
    console.log(`Inserted ${defaultListings.length} listings into MongoDB with new images.`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding MongoDB:', err);
    process.exit(1);
  }
};

forceSeed();
