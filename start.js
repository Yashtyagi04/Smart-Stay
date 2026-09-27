const { spawn } = require('child_process');
const path = require('path');

console.log('\x1b[36m%s\x1b[0m', '=====================================================');
console.log('\x1b[32m%s\x1b[0m', '   🌟 SMART STAY - Full-Stack Housing & Roommate Platform');
console.log('\x1b[33m%s\x1b[0m', '   MERN Stack: React + Node.js + Express.js + MongoDB');
console.log('\x1b[35m%s\x1b[0m', '   Department of AIML, Manipal University Jaipur');
console.log('\x1b[36m%s\x1b[0m', '=====================================================\n');

// Start Express Backend
const server = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: process.env.PORT || '5001' }
});

// Start React Vite Frontend
const client = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit',
  shell: true,
  env: { ...process.env }
});

const cleanup = () => {
  console.log('\n\x1b[31m%s\x1b[0m', 'Shutting down Smart Stay services...');
  server.kill('SIGINT');
  client.kill('SIGINT');
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
