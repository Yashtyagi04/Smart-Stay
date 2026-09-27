const fs = require('fs');
const path = require('path');

const seedDataPath = path.join(__dirname, 'src', 'seedData.js');
let seedData = fs.readFileSync(seedDataPath, 'utf8');

// 1. Locate where 'lst_201' starts
const badStart = seedData.indexOf(`  {
    _id: 'lst_201',`);

if (badStart !== -1) {
  // 2. Locate defaultRoommates declaration
  const roommatesStart = seedData.indexOf('const defaultRoommates = [');
  
  if (roommatesStart !== -1) {
    // 3. Remove everything in between, and ensure correct closing bracket for defaultListings
    // The previous item ends just before badStart.
    // It looks like: 
    //    createdAt: new Date()
    //   },
    // We want to slice right after that `},` but wait, badStart is exactly at `  {`. So there is a comma before it.
    let beforeBad = seedData.substring(0, badStart);
    if (beforeBad.endsWith(',\n')) {
      beforeBad = beforeBad.slice(0, -2); // remove comma and newline
    } else if (beforeBad.endsWith(',')) {
      beforeBad = beforeBad.slice(0, -1);
    }
    
    // Add the correct closing brackets and space
    seedData = beforeBad + '\n];\n\n' + seedData.substring(roommatesStart);
    fs.writeFileSync(seedDataPath, seedData);
    console.log("Successfully fixed the file format.");
  } else {
    console.log("Could not find defaultRoommates");
  }
} else {
  console.log("Could not find lst_201");
}
