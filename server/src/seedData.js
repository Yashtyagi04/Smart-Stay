const bcrypt = require('bcryptjs');

const getHashedPassword = (pwd) => {
  return bcrypt.hashSync(pwd, 10);
};

const defaultUsers = [
  {
    _id: 'usr_001',
    id: 'usr_001',
    name: 'Yash Tyagi',
    email: 'yash@smartstay.com',
    password: getHashedPassword('password123'),
    role: 'tenant',
    phone: '+91 98290 12345',
    college: 'Manipal University Jaipur',
    course: 'B.Tech CSE (AIML)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    verified: true,
    trustBadge: true,
    createdAt: new Date()
  },
  {
    _id: 'usr_002',
    id: 'usr_002',
    name: 'Rajesh Sharma',
    email: 'rajesh@landlord.com',
    password: getHashedPassword('password123'),
    role: 'landlord',
    phone: '+91 94140 88990',
    college: 'MUJ Campus Area Resident',
    course: 'Property Partner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    verified: true,
    trustBadge: true,
    createdAt: new Date()
  },
  {
    _id: 'usr_003',
    id: 'usr_003',
    name: 'Dr. Anamika Dhillon',
    email: 'admin@smartstay.com',
    password: getHashedPassword('password123'),
    role: 'admin',
    phone: '+91 99999 00001',
    college: 'Manipal University Jaipur',
    course: 'Department of AIML',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    verified: true,
    trustBadge: true,
    createdAt: new Date()
  }
];

const defaultListings = [
  {
    _id: 'lst_101',
    id: 'lst_101',
    title: 'Royal Palms Luxury Student Residency',
    description: 'Premier student accommodation located right opposite Manipal University Jaipur main gate. Featuring air-conditioned private & sharing rooms, 4-tier biometric security, 200 Mbps fiber optic internet, 3 times chef-prepared North & South Indian meals, in-house gym, and 24/7 power backup.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Hostel',
    genderSuitability: 'Boys',
    city: 'Jaipur',
    address: 'Opp. Gate 2, Manipal University Jaipur, Dehmi Kalan, Ajmer Road',
    landmark: 'Opposite MUJ Main Gate',
    lat: 26.8439,
    lng: 75.5652,
    price: 9500,
    deposit: 15000,
    sharingTypes: [
      { type: 'Single Private Room', price: 14500, available: true },
      { type: 'Double Sharing AC', price: 9500, available: true },
      { type: 'Triple Sharing', price: 7200, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      '3-Time North/South Meals',
      'Power Backup 24x7',
      'Gym & Fitness Studio',
      'Biometric & CCTV Access',
      'Daily Housekeeping',
      'Laundry Service',
      'Attached Washroom',
      'Study Lounge'
    ],
    foodIncluded: true,
    mealPlan: 'Nutritious breakfast, lunch, high-tea snacks, and dinner included (Special Sunday Feast)',
    rules: [
      'Night curfew: 10:30 PM (gate registers digital punch)',
      'Visitors allowed in cafeteria/lounge until 8:00 PM',
      'Quiet study hours after 11:00 PM',
      'No smoking or alcohol within premises'
    ],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 38,
    isVerified: true,
    status: 'available',
    curfewTime: '10:30 PM',
    distanceToCampus: '300 meters from MUJ Gate',
    createdAt: new Date()
  },
  {
    _id: 'lst_102',
    id: 'lst_102',
    title: 'Aura Heights - Girls Executive PG',
    description: 'Ultra-safe and premium living space exclusively for female students and researchers. Features dedicated female warden, automated smart key entry, spacious sunlit balconies, study desks with ergonomic chairs, and wholesome organic vegetarian meals.',
    ownerId: 'usr_002',
    ownerName: 'Sunita Sharma & Rajesh Sharma',
    ownerPhone: '+91 94140 88991',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'PG',
    genderSuitability: 'Girls',
    city: 'Jaipur',
    address: 'Near Old Toll Plaza, Bagru Road, Dehmi Kalan',
    landmark: 'Behind Saras Dairy Booth, MUJ Sector',
    lat: 26.8485,
    lng: 75.5695,
    price: 8800,
    deposit: 12000,
    sharingTypes: [
      { type: 'Single Deluxe AC', price: 13500, available: true },
      { type: 'Double Sharing AC', price: 8800, available: true },
      { type: 'Triple Sharing Economy', price: 6800, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Pure Vegetarian Meals',
      '24/7 Female Warden',
      'Biometric & CCTV Access',
      'Daily Room Cleaning',
      'Attached Geyser Washroom',
      'RO Drinking Water',
      'Lift & Power Backup'
    ],
    foodIncluded: true,
    mealPlan: 'Pure vegetarian balanced diet with fresh seasonal fruits and milk every evening',
    rules: [
      'Curfew strictly 9:30 PM with parent SMS alert',
      'Family members allowed in common lobby',
      'Eco-friendly noise regulations'
    ],
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 44,
    isVerified: true,
    status: 'available',
    curfewTime: '9:30 PM',
    distanceToCampus: '650 meters from MUJ',
    createdAt: new Date()
  },
  {
    _id: 'lst_103',
    id: 'lst_103',
    title: 'The Hub Co-Living Spaces & Studios',
    description: 'Vibrant modern co-living community designed for AIML, coding enthusiasts, and startup founders. Features 300 Mbps symmetrical Wi-Fi, breakout discussion rooms, cafeteria, Netflix lounge, rooftop gaming area, and flexible monthly leases.',
    ownerId: 'usr_002',
    ownerName: 'Vikas Agarwal',
    ownerPhone: '+91 98281 77665',
    ownerEmail: 'hub@smartstay.com',
    propertyType: 'Flat',
    genderSuitability: 'Co-ed',
    city: 'Jaipur',
    address: 'Near RIICO Industrial Area, Ajmer Express Highway',
    landmark: 'Adjacent to Tech Innovators Hub',
    lat: 26.8520,
    lng: 75.5580,
    price: 11000,
    deposit: 15000,
    sharingTypes: [
      { type: 'Private Studio Flat', price: 18000, available: true },
      { type: 'Twin Sharing Suite', price: 11000, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Co-Working Pods',
      'Cafeteria & Coffee Bar',
      'PlayStation Lounge',
      'Rooftop Terrace',
      'Power Backup 24x7',
      'Smart TV & OTT Access'
    ],
    foodIncluded: false,
    mealPlan: 'On-demand café dining & shared modular kitchen equipped with induction, fridge, and microwave',
    rules: [
      'Zero strict curfew (24/7 keycard entry)',
      'Visitors permitted in common coworking area',
      'Clean desk policy in shared zones'
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 29,
    isVerified: true,
    status: 'available',
    curfewTime: 'No Curfew (24/7 Access)',
    distanceToCampus: '1.8 km from MUJ Campus (Shuttle Available)',
    createdAt: new Date()
  },
  {
    _id: 'lst_104',
    id: 'lst_104',
    title: 'Shiv Shakti Boys Hostel & Mess',
    description: 'Affordable, homely, and well-disciplined accommodation with large airy rooms, attached western bathrooms, unlimited tasty home-style meals, and dedicated bus shuttle to Manipal University Jaipur.',
    ownerId: 'usr_002',
    ownerName: 'Mahesh Choudhary',
    ownerPhone: '+91 97840 55443',
    ownerEmail: 'shivhostel@gmail.com',
    propertyType: 'Hostel',
    genderSuitability: 'Boys',
    city: 'Jaipur',
    address: 'Bagru Bypass Road, Near Dehmi Bus Stop',
    landmark: 'Near Indian Oil Petrol Pump',
    lat: 26.8390,
    lng: 75.5510,
    price: 6500,
    deposit: 8000,
    sharingTypes: [
      { type: 'Single Room Cooler', price: 9000, available: true },
      { type: 'Double Room Cooler', price: 6500, available: true },
      { type: 'Triple Room Economy', price: 5500, available: true }
    ],
    amenities: [
      'Wi-Fi Internet',
      'Desert Air Cooler',
      '3-Time Homestyle Meals',
      'RO Mineral Water',
      'Free University Shuttle',
      'CCTV Surveillance',
      'Cricket Ground Access'
    ],
    foodIncluded: true,
    mealPlan: 'Fresh Rajasthani & North Indian thali (unlimited rotis, sabzi, dal, curd)',
    rules: [
      'Curfew 10:00 PM',
      'Mandatory biometric attendance every night',
      'No loud speakers after 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1596276020587-8044fe049813?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.4,
    reviewCount: 19,
    isVerified: true,
    status: 'available',
    curfewTime: '10:00 PM',
    distanceToCampus: '2.1 km from MUJ (Free shuttle provided)',
    createdAt: new Date()
  },
  {
    _id: 'lst_105',
    id: 'lst_105',
    title: 'Koramangala Techie & Scholar Haven',
    description: 'High-end furnished residency in the heart of Bangalore startup district. Walkable to major tech parks, colleges, and metro station. Features automated laundry, ergonomic workstations, and high-speed multi-WAN Wi-Fi.',
    ownerId: 'usr_002',
    ownerName: 'Deepak Reddy',
    ownerPhone: '+91 98801 22334',
    ownerEmail: 'bangalorestay@smartstay.com',
    propertyType: 'PG',
    genderSuitability: 'Co-ed',
    city: 'Bangalore',
    address: '4th Block, 100ft Road, Koramangala',
    landmark: 'Behind Sony Signal',
    lat: 12.9352,
    lng: 77.6245,
    price: 13000,
    deposit: 20000,
    sharingTypes: [
      { type: 'Single AC Studio', price: 21000, available: true },
      { type: 'Double Sharing AC', price: 13000, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'South & North Meals',
      'Gym & Fitness Studio',
      'Biometric Access',
      'Power Backup 24x7',
      'Attached Balcony'
    ],
    foodIncluded: true,
    mealPlan: 'Wholesome buffet breakfast and dinner, weekend lunches included',
    rules: [
      'Digital entry card 24/7',
      'Respectful co-living culture'
    ],
    images: [
      'https://images.unsplash.com/photo-1502005229762-ee152da92e06?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 52,
    isVerified: true,
    status: 'available',
    curfewTime: 'No Curfew',
    distanceToCampus: 'Central Location',
    createdAt: new Date()
  },
  {
    _id: 'lst_106',
    id: 'lst_106',
    title: 'Hauz Khas Green View Residency',
    description: 'Peaceful student and young professional flats right next to Hauz Khas Village and IIT Delhi campus. Tree-lined streets, secure gated colony, and fully modular kitchens.',
    ownerId: 'usr_002',
    ownerName: 'Manish Bhatia',
    ownerPhone: '+91 98110 55441',
    ownerEmail: 'delhistay@smartstay.com',
    propertyType: 'Flat',
    genderSuitability: 'Co-ed',
    city: 'Delhi',
    address: 'Block C, Hauz Khas Enclave, New Delhi',
    landmark: '5 mins from Hauz Khas Metro',
    lat: 28.5494,
    lng: 77.2001,
    price: 15000,
    deposit: 25000,
    sharingTypes: [
      { type: 'Private Room in 3BHK', price: 22000, available: true },
      { type: 'Shared Master Bedroom', price: 15000, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Fully Modular Kitchen',
      'Smart TV',
      '24/7 Gated Security',
      'Balcony Garden'
    ],
    foodIncluded: false,
    mealPlan: 'Cook service available on sharing basis (custom menu)',
    rules: [
      'Residential gated community guidelines',
      'Pet friendly upon agreement'
    ],
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 31,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: 'Near IIT Delhi',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_0',
    id: 'lst_pro_0',
    title: 'Oxford Elite Residence',
    description: 'Experience premium student and professional living at Oxford Elite Residence. Fully furnished Hostel with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Hostel',
    genderSuitability: 'Boys',
    city: 'Jaipur',
    address: 'Plot 45, Knowledge Park, Jaipur',
    landmark: 'Near Central Station',
    lat: 26.8645,
    lng: 75.5601,
    price: 10167,
    deposit: 20334,
    sharingTypes: [
      { type: 'Single Premium', price: 13167, available: true },
      { type: 'Double Sharing', price: 10167, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: true,
    mealPlan: 'Delicious 3-time meals served fresh',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 56,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '1760 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_1',
    id: 'lst_pro_1',
    title: 'Stanza Living - Orion House',
    description: 'Experience premium student and professional living at Stanza Living - Orion House. Fully furnished PG with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'PG',
    genderSuitability: 'Girls',
    city: 'Bangalore',
    address: 'Sector 5, University Road, Bangalore',
    landmark: 'Near Central Station',
    lat: 12.9649,
    lng: 77.6007,
    price: 12594,
    deposit: 25188,
    sharingTypes: [
      { type: 'Single Premium', price: 15594, available: true },
      { type: 'Double Sharing', price: 12594, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: false,
    mealPlan: 'Shared fully-equipped kitchen available',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.4,
    reviewCount: 39,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '1423 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_2',
    id: 'lst_pro_2',
    title: 'Zolo Amber',
    description: 'Experience premium student and professional living at Zolo Amber. Fully furnished Flat with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Flat',
    genderSuitability: 'Co-ed',
    city: 'Delhi',
    address: 'C-Block, Scholar Avenue, Delhi',
    landmark: 'Near Central Station',
    lat: 28.7021,
    lng: 77.0936,
    price: 11528,
    deposit: 23056,
    sharingTypes: [
      { type: 'Single Premium', price: 14528, available: true },
      { type: 'Double Sharing', price: 11528, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: true,
    mealPlan: 'Delicious 3-time meals served fresh',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596276020587-8044fe049813?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ce?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 22,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '991 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_3',
    id: 'lst_pro_3',
    title: 'MyPlace Student Housing',
    description: 'Experience premium student and professional living at MyPlace Student Housing. Fully furnished Hostel with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Hostel',
    genderSuitability: 'Boys',
    city: 'Kota',
    address: 'Ring Road 3, Near Campus Gate, Kota',
    landmark: 'Near Central Station',
    lat: 25.1810,
    lng: 75.8434,
    price: 9408,
    deposit: 18816,
    sharingTypes: [
      { type: 'Single Premium', price: 12408, available: true },
      { type: 'Double Sharing', price: 9408, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: false,
    mealPlan: 'Shared fully-equipped kitchen available',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ce?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.3,
    reviewCount: 23,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '142 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_4',
    id: 'lst_pro_4',
    title: 'Nestaway Premium Suites',
    description: 'Experience premium student and professional living at Nestaway Premium Suites. Fully furnished PG with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'PG',
    genderSuitability: 'Girls',
    city: 'Jaipur',
    address: 'A-12, Elite Layout, Jaipur',
    landmark: 'Near Central Station',
    lat: 26.8346,
    lng: 75.5639,
    price: 12463,
    deposit: 24926,
    sharingTypes: [
      { type: 'Single Premium', price: 15463, available: true },
      { type: 'Double Sharing', price: 12463, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: true,
    mealPlan: 'Delicious 3-time meals served fresh',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.4,
    reviewCount: 32,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '1599 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_5',
    id: 'lst_pro_5',
    title: 'Urban Haven Living',
    description: 'Experience premium student and professional living at Urban Haven Living. Fully furnished Flat with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Flat',
    genderSuitability: 'Co-ed',
    city: 'Bangalore',
    address: '#405, Silicon Valley, Bangalore',
    landmark: 'Near Central Station',
    lat: 12.9673,
    lng: 77.5904,
    price: 7649,
    deposit: 15298,
    sharingTypes: [
      { type: 'Single Premium', price: 10649, available: true },
      { type: 'Double Sharing', price: 7649, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: false,
    mealPlan: 'Shared fully-equipped kitchen available',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0,
    reviewCount: 52,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '727 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_6',
    id: 'lst_pro_6',
    title: 'Campus View Apartments',
    description: 'Experience premium student and professional living at Campus View Apartments. Fully furnished Hostel with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Hostel',
    genderSuitability: 'Boys',
    city: 'Delhi',
    address: 'Phase 2, Vasant Vihar, Delhi',
    landmark: 'Near Central Station',
    lat: 28.7147,
    lng: 77.1074,
    price: 13136,
    deposit: 26272,
    sharingTypes: [
      { type: 'Single Premium', price: 16136, available: true },
      { type: 'Double Sharing', price: 13136, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: true,
    mealPlan: 'Delicious 3-time meals served fresh',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522794825942-d60920d36402?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 47,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '1687 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_7',
    id: 'lst_pro_7',
    title: 'The Scholar House',
    description: 'Experience premium student and professional living at The Scholar House. Fully furnished PG with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'PG',
    genderSuitability: 'Girls',
    city: 'Kota',
    address: 'Student Colony, Station Road, Kota',
    landmark: 'Near Central Station',
    lat: 25.1700,
    lng: 75.8231,
    price: 9170,
    deposit: 18340,
    sharingTypes: [
      { type: 'Single Premium', price: 12170, available: true },
      { type: 'Double Sharing', price: 9170, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: false,
    mealPlan: 'Shared fully-equipped kitchen available',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1513161455079-7dc7321523b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.3,
    reviewCount: 52,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '706 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_8',
    id: 'lst_pro_8',
    title: 'Oasis Girls Hostel',
    description: 'Experience premium student and professional living at Oasis Girls Hostel. Fully furnished Flat with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Flat',
    genderSuitability: 'Co-ed',
    city: 'Jaipur',
    address: 'Plot 45, Knowledge Park, Jaipur',
    landmark: 'Near Central Station',
    lat: 26.8620,
    lng: 75.5447,
    price: 12340,
    deposit: 24680,
    sharingTypes: [
      { type: 'Single Premium', price: 15340, available: true },
      { type: 'Double Sharing', price: 12340, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: true,
    mealPlan: 'Delicious 3-time meals served fresh',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee152da92e06?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.3,
    reviewCount: 23,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '1398 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_9',
    id: 'lst_pro_9',
    title: 'Apex Boys Residency',
    description: 'Experience premium student and professional living at Apex Boys Residency. Fully furnished Hostel with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Hostel',
    genderSuitability: 'Boys',
    city: 'Bangalore',
    address: 'Sector 5, University Road, Bangalore',
    landmark: 'Near Central Station',
    lat: 12.9906,
    lng: 77.5826,
    price: 7181,
    deposit: 14362,
    sharingTypes: [
      { type: 'Single Premium', price: 10181, available: true },
      { type: 'Double Sharing', price: 7181, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: false,
    mealPlan: 'Shared fully-equipped kitchen available',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.4,
    reviewCount: 48,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '2045 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_10',
    id: 'lst_pro_10',
    title: 'Comfort Stay Co-Living',
    description: 'Experience premium student and professional living at Comfort Stay Co-Living. Fully furnished PG with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'PG',
    genderSuitability: 'Girls',
    city: 'Delhi',
    address: 'C-Block, Scholar Avenue, Delhi',
    landmark: 'Near Central Station',
    lat: 28.6827,
    lng: 77.1146,
    price: 10241,
    deposit: 20482,
    sharingTypes: [
      { type: 'Single Premium', price: 13241, available: true },
      { type: 'Double Sharing', price: 10241, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: true,
    mealPlan: 'Delicious 3-time meals served fresh',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1502005229762-ee152da92e06?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    reviewCount: 18,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '1984 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_11',
    id: 'lst_pro_11',
    title: 'Horizon Student PG',
    description: 'Experience premium student and professional living at Horizon Student PG. Fully furnished Flat with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Flat',
    genderSuitability: 'Co-ed',
    city: 'Kota',
    address: 'Ring Road 3, Near Campus Gate, Kota',
    landmark: 'Near Central Station',
    lat: 25.2019,
    lng: 75.8210,
    price: 11975,
    deposit: 23950,
    sharingTypes: [
      { type: 'Single Premium', price: 14975, available: true },
      { type: 'Double Sharing', price: 11975, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: false,
    mealPlan: 'Shared fully-equipped kitchen available',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee152da92e06?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.2,
    reviewCount: 53,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '738 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_12',
    id: 'lst_pro_12',
    title: 'Greenfield Flats',
    description: 'Experience premium student and professional living at Greenfield Flats. Fully furnished Hostel with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Hostel',
    genderSuitability: 'Boys',
    city: 'Jaipur',
    address: 'A-12, Elite Layout, Jaipur',
    landmark: 'Near Central Station',
    lat: 26.8242,
    lng: 75.5649,
    price: 9881,
    deposit: 19762,
    sharingTypes: [
      { type: 'Single Premium', price: 12881, available: true },
      { type: 'Double Sharing', price: 9881, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: true,
    mealPlan: 'Delicious 3-time meals served fresh',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.4,
    reviewCount: 43,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '255 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_13',
    id: 'lst_pro_13',
    title: 'The Summit Residency',
    description: 'Experience premium student and professional living at The Summit Residency. Fully furnished PG with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'PG',
    genderSuitability: 'Girls',
    city: 'Bangalore',
    address: '#405, Silicon Valley, Bangalore',
    landmark: 'Near Central Station',
    lat: 12.9479,
    lng: 77.5983,
    price: 13193,
    deposit: 26386,
    sharingTypes: [
      { type: 'Single Premium', price: 16193, available: true },
      { type: 'Double Sharing', price: 13193, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: false,
    mealPlan: 'Shared fully-equipped kitchen available',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1497367375252-fb5596395b00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 58,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '2077 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_14',
    id: 'lst_pro_14',
    title: 'Cityscape Student Homes',
    description: 'Experience premium student and professional living at Cityscape Student Homes. Fully furnished Flat with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Flat',
    genderSuitability: 'Co-ed',
    city: 'Delhi',
    address: 'Phase 2, Vasant Vihar, Delhi',
    landmark: 'Near Central Station',
    lat: 28.6894,
    lng: 77.1170,
    price: 12699,
    deposit: 25398,
    sharingTypes: [
      { type: 'Single Premium', price: 15699, available: true },
      { type: 'Double Sharing', price: 12699, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: true,
    mealPlan: 'Delicious 3-time meals served fresh',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ce?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 13,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '1019 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_15',
    id: 'lst_pro_15',
    title: 'Trinity Rooms',
    description: 'Experience premium student and professional living at Trinity Rooms. Fully furnished Hostel with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Hostel',
    genderSuitability: 'Boys',
    city: 'Kota',
    address: 'Student Colony, Station Road, Kota',
    landmark: 'Near Central Station',
    lat: 25.1980,
    lng: 75.8505,
    price: 12311,
    deposit: 24622,
    sharingTypes: [
      { type: 'Single Premium', price: 15311, available: true },
      { type: 'Double Sharing', price: 12311, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: false,
    mealPlan: 'Shared fully-equipped kitchen available',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1522794825942-d60920d36402?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.3,
    reviewCount: 52,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '1424 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_16',
    id: 'lst_pro_16',
    title: 'Nova Premium Housing',
    description: 'Experience premium student and professional living at Nova Premium Housing. Fully furnished PG with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'PG',
    genderSuitability: 'Girls',
    city: 'Jaipur',
    address: 'Plot 45, Knowledge Park, Jaipur',
    landmark: 'Near Central Station',
    lat: 26.8367,
    lng: 75.5672,
    price: 9488,
    deposit: 18976,
    sharingTypes: [
      { type: 'Single Premium', price: 12488, available: true },
      { type: 'Double Sharing', price: 9488, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: true,
    mealPlan: 'Delicious 3-time meals served fresh',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1513161455079-7dc7321523b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.3,
    reviewCount: 17,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '1210 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_17',
    id: 'lst_pro_17',
    title: 'Crescent Moon PG',
    description: 'Experience premium student and professional living at Crescent Moon PG. Fully furnished Flat with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Flat',
    genderSuitability: 'Co-ed',
    city: 'Bangalore',
    address: 'Sector 5, University Road, Bangalore',
    landmark: 'Near Central Station',
    lat: 12.9557,
    lng: 77.5820,
    price: 9082,
    deposit: 18164,
    sharingTypes: [
      { type: 'Single Premium', price: 12082, available: true },
      { type: 'Double Sharing', price: 9082, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: false,
    mealPlan: 'Shared fully-equipped kitchen available',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0,
    reviewCount: 42,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '1226 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_18',
    id: 'lst_pro_18',
    title: 'Vibrant Co-Living',
    description: 'Experience premium student and professional living at Vibrant Co-Living. Fully furnished Hostel with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'Hostel',
    genderSuitability: 'Boys',
    city: 'Delhi',
    address: 'C-Block, Scholar Avenue, Delhi',
    landmark: 'Near Central Station',
    lat: 28.6957,
    lng: 77.0797,
    price: 10458,
    deposit: 20916,
    sharingTypes: [
      { type: 'Single Premium', price: 13458, available: true },
      { type: 'Double Sharing', price: 10458, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: true,
    mealPlan: 'Delicious 3-time meals served fresh',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 10,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '599 meters',
    createdAt: new Date()
  },
  {
    _id: 'lst_pro_19',
    id: 'lst_pro_19',
    title: 'Serenity Studios',
    description: 'Experience premium student and professional living at Serenity Studios. Fully furnished PG with top-notch security, fast Wi-Fi, and vibrant community spaces. Perfect for a focused yet relaxing lifestyle.',
    ownerId: 'usr_002',
    ownerName: 'Rajesh Sharma',
    ownerPhone: '+91 94140 88990',
    ownerEmail: 'rajesh@landlord.com',
    propertyType: 'PG',
    genderSuitability: 'Girls',
    city: 'Kota',
    address: 'Ring Road 3, Near Campus Gate, Kota',
    landmark: 'Near Central Station',
    lat: 25.1811,
    lng: 75.8240,
    price: 10742,
    deposit: 21484,
    sharingTypes: [
      { type: 'Single Premium', price: 13742, available: true },
      { type: 'Double Sharing', price: 10742, available: true }
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Air Conditioning',
      'Power Backup 24x7',
      'Daily Housekeeping',
      'CCTV Security',
      'Washing Machine'
    ],
    foodIncluded: false,
    mealPlan: 'Shared fully-equipped kitchen available',
    rules: [
      'Curfew: 11:00 PM',
      'No loud music post 10 PM'
    ],
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.3,
    reviewCount: 19,
    isVerified: true,
    status: 'available',
    curfewTime: '11:00 PM',
    distanceToCampus: '1869 meters',
    createdAt: new Date()
  }
];

const defaultRoommates = [
  {
    _id: 'rm_201',
    id: 'rm_201',
    userId: 'usr_001',
    name: 'Aakash Srivastava',
    gender: 'Male',
    age: 20,
    college: 'Manipal University Jaipur',
    course: 'B.Tech CSE (AIML)',
    year: '3rd Year',
    budget: 10000,
    preferredCity: 'Jaipur',
    sleepSchedule: 'Night Owl',
    dietaryPreference: 'Vegetarian',
    smoking: 'Non-Smoker',
    drinking: 'Non-Drinker',
    cleanliness: 5,
    studyHabit: 'Silent Study',
    hobbies: ['Machine Learning', 'Competitive Coding', 'Football', 'Chess'],
    bio: 'PBL-III team member working on AI models. Looking for a neat, focused roommate near MUJ campus who values quiet study time at night.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    phone: '+91 98291 99001',
    verifiedBadge: true,
    createdAt: new Date()
  },
  {
    _id: 'rm_202',
    id: 'rm_202',
    userId: 'usr_102',
    name: 'Yash Tyagi',
    gender: 'Male',
    age: 21,
    college: 'Manipal University Jaipur',
    course: 'B.Tech CSE (AIML)',
    year: '3rd Year',
    budget: 9500,
    preferredCity: 'Jaipur',
    sleepSchedule: 'Night Owl',
    dietaryPreference: 'Vegetarian',
    smoking: 'Non-Smoker',
    drinking: 'Non-Drinker',
    cleanliness: 4,
    studyHabit: 'Group Study',
    hobbies: ['Full Stack Dev', 'Gaming (Valorant)', 'Cricket', 'Gym'],
    bio: 'Coding enthusiast and team partner for Smart Stay. Passionate about web engineering and tech hackathons. Looking for friendly sharing accommodation near Gate 1 or 2.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    phone: '+91 98292 33445',
    verifiedBadge: true,
    createdAt: new Date()
  },
  {
    _id: 'rm_203',
    id: 'rm_203',
    userId: 'usr_103',
    name: 'Ananya Sharma',
    gender: 'Female',
    age: 20,
    college: 'Manipal University Jaipur',
    course: 'B.Tech Data Science',
    year: '3rd Year',
    budget: 9000,
    preferredCity: 'Jaipur',
    sleepSchedule: 'Early Bird',
    dietaryPreference: 'Vegetarian',
    smoking: 'Non-Smoker',
    drinking: 'Non-Drinker',
    cleanliness: 5,
    studyHabit: 'Silent Study',
    hobbies: ['Reading Novels', 'Badminton', 'UI/UX Design', 'Music'],
    bio: 'Calm, disciplined, and focused student looking for a female roommate in an AC PG near MUJ. Very tidy and respects personal boundaries.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    phone: '+91 94140 11223',
    verifiedBadge: true,
    createdAt: new Date()
  },
  {
    _id: 'rm_204',
    id: 'rm_204',
    userId: 'usr_104',
    name: 'Rohan Verma',
    gender: 'Male',
    age: 22,
    college: 'Manipal University Jaipur',
    course: 'B.Tech Computer Science',
    year: '4th Year',
    budget: 12000,
    preferredCity: 'Jaipur',
    sleepSchedule: 'Flexible',
    dietaryPreference: 'Eggetarian',
    smoking: 'Non-Smoker',
    drinking: 'Social',
    cleanliness: 4,
    studyHabit: 'Music in Background',
    hobbies: ['Music Production', 'Guitar', 'Open Source', 'Fitness'],
    bio: 'Final year senior prepping for product management and placements. Looking for a chill 2BHK flatmate or studio partner with good vibes.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    phone: '+91 97840 66778',
    verifiedBadge: true,
    createdAt: new Date()
  },
  {
    _id: 'rm_205',
    id: 'rm_205',
    userId: 'usr_105',
    name: 'Pooja Choudhary',
    gender: 'Female',
    age: 21,
    college: 'Manipal University Jaipur',
    course: 'B.Tech CSE (AIML)',
    year: '3rd Year',
    budget: 8500,
    preferredCity: 'Jaipur',
    sleepSchedule: 'Night Owl',
    dietaryPreference: 'Jain',
    smoking: 'Non-Smoker',
    drinking: 'Non-Drinker',
    cleanliness: 5,
    studyHabit: 'Group Study',
    hobbies: ['Robotics', 'Debating', 'Table Tennis', 'Sketching'],
    bio: 'Jain student preferring vegetarian/Jain meal friendly roommate in Aura Heights or nearby girls hostel. Friendly, organized, and cooperative.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    phone: '+91 98877 66554',
    verifiedBadge: true,
    createdAt: new Date()
  }
];

const defaultBookings = [
  {
    _id: 'bkg_301',
    id: 'bkg_301',
    listingId: 'lst_101',
    listingTitle: 'Royal Palms Luxury Student Residency',
    listingAddress: 'Opp. Gate 2, Manipal University Jaipur, Dehmi Kalan',
    userId: 'usr_001',
    userName: 'Yash Tyagi',
    userEmail: 'yash@smartstay.com',
    userPhone: '+91 98290 12345',
    sharingType: 'Double Sharing AC',
    monthlyRent: 9500,
    moveInDate: '2026-10-01',
    durationMonths: 6,
    status: 'approved',
    message: 'Confirmed room for academic semester. Need parking slot for two-wheeler.',
    createdAt: new Date()
  },
  {
    _id: 'bkg_302',
    id: 'bkg_302',
    listingId: 'lst_103',
    listingTitle: 'The Hub Co-Living Spaces & Studios',
    listingAddress: 'Near RIICO Industrial Area, Ajmer Express Highway',
    userId: 'usr_001',
    userName: 'Yash Tyagi',
    userEmail: 'yash@smartstay.com',
    userPhone: '+91 98290 12345',
    sharingType: 'Twin Sharing Suite',
    monthlyRent: 11000,
    moveInDate: '2026-11-15',
    durationMonths: 3,
    status: 'pending',
    message: 'Looking to explore studio co-living during the upcoming winter tech internship.',
    createdAt: new Date()
  }
];

const defaultMaintenance = [
  {
    _id: 'mnt_401',
    id: 'mnt_401',
    userId: 'usr_001',
    userName: 'Yash Tyagi',
    userPhone: '+91 98290 12345',
    propertyTitle: 'Royal Palms Luxury Student Residency',
    roomNumber: 'Room 304 (Block B)',
    category: 'High-Speed Wi-Fi',
    title: 'Wi-Fi Access Point Frequent Disconnection',
    description: 'The 5GHz router on 3rd floor corridor has high packet drop during evening hours (8 PM - 11 PM) while attending online lab sessions.',
    priority: 'High',
    status: 'in_progress',
    preferredSlot: 'Today 5:00 PM',
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 86400000), note: 'Complaint registered by Yash Tyagi' },
      { status: 'in_progress', timestamp: new Date(Date.now() - 36000000), note: 'Network technician assigned. Firmware upgrade scheduled.' }
    ],
    createdAt: new Date(Date.now() - 86400000)
  },
  {
    _id: 'mnt_402',
    id: 'mnt_402',
    userId: 'usr_001',
    userName: 'Yash Tyagi',
    userPhone: '+91 98290 12345',
    propertyTitle: 'Royal Palms Luxury Student Residency',
    roomNumber: 'Room 304 (Block B)',
    category: 'Housekeeping / Cleaning',
    title: 'Bi-Weekly Deep Washroom & Balcony Sanitation',
    description: 'Scheduled deep scrubbing and balcony window cleaning requested before university examinations.',
    priority: 'Medium',
    status: 'resolved',
    preferredSlot: 'Yesterday Morning',
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 172800000), note: 'Service booked' },
      { status: 'in_progress', timestamp: new Date(Date.now() - 100000000), note: 'Housekeeping team dispatched' },
      { status: 'resolved', timestamp: new Date(Date.now() - 50000000), note: 'Sanitation completed and inspected by floor warden' }
    ],
    createdAt: new Date(Date.now() - 172800000)
  }
];

const defaultAgreements = [
  {
    _id: 'agr_501',
    id: 'agr_501',
    listingId: 'lst_101',
    listingTitle: 'Royal Palms Luxury Student Residency',
    landlordId: 'usr_002',
    landlordName: 'Rajesh Sharma',
    tenantId: 'usr_001',
    tenantName: 'Yash Tyagi',
    tenantAadhaar: 'XXXX-XXXX-6721',
    monthlyRent: 9500,
    securityDeposit: 15000,
    lockinPeriodMonths: 6,
    startDate: '2026-10-01',
    status: 'signed',
    tenantSignature: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><text x="10" y="40" font-family="cursive" font-size="28" fill="%232563eb">Yash Tyagi</text></svg>',
    signedAt: new Date(),
    termsAccepted: true,
    createdAt: new Date()
  }
];

module.exports = {
  defaultUsers,
  defaultListings,
  defaultRoommates,
  defaultBookings,
  defaultMaintenance,
  defaultAgreements
};
