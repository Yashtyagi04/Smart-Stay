require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB, isLiveMongo } = require('./db');

const authRouter = require('./routes/auth');
const listingsRouter = require('./routes/listings');
const roommatesRouter = require('./routes/roommates');
const bookingsRouter = require('./routes/bookings');
const servicesRouter = require('./routes/services');
const agreementsRouter = require('./routes/agreements');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/listings', listingsRouter);
app.use('/api/roommates', roommatesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/agreements', agreementsRouter);
app.use('/api/admin', adminRouter);

// System health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    project: 'Smart Stay - AIM2270 PBL-III',
    institution: 'Manipal University Jaipur (MUJ)',
    timestamp: new Date(),
    database: isLiveMongo() ? 'MongoDB (Live Atlas/Local)' : 'Embedded Resilient Store (Active)',
    mongoActive: isLiveMongo(),
    version: '1.0.0'
  });
});

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Initialize DB and start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log('\x1b[32m%s\x1b[0m', `🚀 [Smart Stay API] Backend running on http://localhost:${PORT}`);
    console.log('\x1b[36m%s\x1b[0m', `🔗 Health Check: http://localhost:${PORT}/api/health`);
  });
};

startServer();
// Trigger restart
// Trigger restart for DB connect
// Trigger restart for DNS SRV fix
// Trigger restart to seed MongoDB
// Trigger restart to seed MongoDB correctly
