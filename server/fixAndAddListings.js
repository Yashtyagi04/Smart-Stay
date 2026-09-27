const fs = require('fs');
const path = require('path');

const seedDataPath = path.join(__dirname, 'src', 'seedData.js');
let seedData = fs.readFileSync(seedDataPath, 'utf8');

// First, let's revert back the broken seedData.js 
// We know it broke at 'Generated Listing 1' which starts at lst_201.
// Let's find the start of our injection.
const breakPoint = seedData.indexOf(`  {
    _id: 'lst_201',`);

if (breakPoint > 0) {
  // Restore it to the original pattern
  const part1 = seedData.substring(0, breakPoint - 1); // remove the comma
  const defaultRoommatesIndex = seedData.indexOf('const defaultRoommates');
  const part2 = seedData.substring(defaultRoommatesIndex);
  seedData = part1 + '];\n\n' + part2;
}

// Now generate realistic listings
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
    
    // Generate lat/lng close to Jaipur/Bangalore/Delhi
    let lat, lng;
    if (city === 'Jaipur') { lat = 26.8439 + (Math.random() - 0.5) * 0.05; lng = 75.5652 + (Math.random() - 0.5) * 0.05; }
    else if (city === 'Bangalore') { lat = 12.9716 + (Math.random() - 0.5) * 0.05; lng = 77.5946 + (Math.random() - 0.5) * 0.05; }
    else if (city === 'Delhi') { lat = 28.7041 + (Math.random() - 0.5) * 0.05; lng = 77.1025 + (Math.random() - 0.5) * 0.05; }
    else { lat = 25.1814 + (Math.random() - 0.5) * 0.05; lng = 75.8322 + (Math.random() - 0.5) * 0.05; } // Kota
    
    const price = Math.floor(6000 + Math.random() * 8000);
    const deposit = price * 2;
    
    listings.push(`
  {
    _id: 'lst_pro_${i}',
    id: 'lst_pro_${i}',
    title: '${title} - ${gender} ${type}',
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
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
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

// Find the target to append the new professional listings
const targetPattern = /}\s*];\s*const defaultRoommates/;
if (seedData.match(targetPattern)) {
  seedData = seedData.replace(targetPattern, '},' + professionalListings + '\n];\n\nconst defaultRoommates');
  fs.writeFileSync(seedDataPath, seedData);
  console.log('Fixed syntax and added 20 professional listings to seedData.js');
  
  // To ensure the changes take effect, we must delete data/smartstay.json 
  // so store.js re-reads from seedData.js
  const dataFilePath = path.join(__dirname, 'data', 'smartstay.json');
  if (fs.existsSync(dataFilePath)) {
    fs.unlinkSync(dataFilePath);
    console.log('Deleted data/smartstay.json to force re-seeding.');
  }
} else {
  console.log('Error: Could not find target pattern in seedData.js');
}
