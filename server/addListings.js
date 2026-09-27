const fs = require('fs');
const path = require('path');

const seedDataPath = path.join(__dirname, 'src', 'seedData.js');
let seedData = fs.readFileSync(seedDataPath, 'utf8');

const generateListings = (count) => {
  const types = ['Hostel', 'PG', 'Flat'];
  const genders = ['Boys', 'Girls', 'Co-ed'];
  const cities = ['Jaipur', 'Bangalore', 'Delhi', 'Kota'];
  
  const listings = [];
  
  for (let i = 1; i <= count; i++) {
    const lat = 26.8439 + (Math.random() - 0.5) * 0.05;
    const lng = 75.5652 + (Math.random() - 0.5) * 0.05;
    const type = types[i % 3];
    const gender = genders[i % 3];
    const city = cities[i % 4];
    
    listings.push(`
  {
    _id: 'lst_20${i}',
    id: 'lst_20${i}',
    title: 'Generated Listing ${i} - Premium ${type}',
    description: 'Beautiful and affordable ${type} located in ${city}. Perfect for students and professionals. Features modern amenities, great connectivity, and a safe environment.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: '${type}',
    genderSuitability: '${gender}',
    city: '${city}',
    address: 'Random Street ${i}, ${city} Area',
    landmark: 'Near Landmark ${i}',
    lat: ${lat.toFixed(4)},
    lng: ${lng.toFixed(4)},
    price: ${5000 + (i * 500)},
    deposit: ${10000 + (i * 1000)},
    sharingTypes: [
      { type: 'Single Room', price: ${7000 + (i * 500)}, available: true },
      { type: 'Double Sharing', price: ${5000 + (i * 500)}, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping'
    ],
    foodIncluded: ${i % 2 === 0},
    mealPlan: '${i % 2 === 0 ? 'Breakfast and Dinner included' : 'Self cooking facility'}',
    rules: [
      'Night curfew: 10:30 PM',
      'No smoking or alcohol'
    ],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ],
    rating: ${(4.0 + (i % 10) / 10).toFixed(1)},
    reviewCount: ${10 + i},
    isVerified: true,
    status: 'available',
    curfewTime: '10:30 PM',
    distanceToCampus: '${(i * 100)} meters',
    createdAt: new Date()
  }`);
  }
  
  return listings.join(',');
};

const newListingsString = generateListings(20);

// Find the end of defaultListings array
const targetPattern = /}\s*];\s*const defaultRoommates/;

if (seedData.match(targetPattern)) {
  seedData = seedData.replace(targetPattern, '},' + newListingsString + '\\n];\\n\\nconst defaultRoommates');
  fs.writeFileSync(seedDataPath, seedData);
  console.log('Successfully added 20 listings to seedData.js');
} else {
  console.log('Could not find the target pattern to insert listings.');
}
