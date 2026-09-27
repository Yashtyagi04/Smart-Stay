# SMART STAY 🏠🎓
### Centralized Broker-Free PG, Hostel & Roommate Discovery Platform (MERN Stack)

> **Manipal University Jaipur (MUJ)** 
> **Degree:** B.Tech Computer Science and Engineering (Artificial Intelligence and Machine Learning)  
> **Academic Year:** 2023–2027  
> 
> **Project Team:**
> - **Yash Tyagi** (Registration No: `23FE10CAI00376`)


---

## 📌 Project Overview

**Smart Stay** addresses the housing and accommodation challenges faced by thousands of students relocating to Manipal University Jaipur and urban educational hubs. By bypassing third-party brokerage fees, the platform delivers a verified, transparent, and data-driven accommodation ecosystem.

### Core Capabilities:
1. **Campus-Centric Verified Accommodation Discovery**:
   - Filter by city (Jaipur/MUJ, Bangalore, Delhi, Kota), budget slider, room type (Single, Double, Triple sharing), and gender suitability (Boys, Girls, Co-ed).
   - Distance indicators relative to Manipal University Jaipur campus gates.
2. **Interactive Map Search (Leaflet.js + OpenStreetMap)**:
   - Geolocation-enabled map displaying custom property price pins and a 2km safe commute perimeter around MUJ.
3. **Voice Search Assistant (Web Speech API)**:
   - Real-time voice query transcription supporting both **English** and **हिन्दी (Hindi)** with microphone wave animation.
4. **AI Roommate Compatibility Matching Engine**:
   - Multi-attribute compatibility scoring algorithm factoring in sleep rhythm (Early Bird vs. Night Owl), dietary habits (Veg/Jain/Non-Veg), study routine, budget, and cleanliness standards.
   - Generates compatibility percentages (e.g. 96% Match) and itemized matching rationale.
5. **Hostel Services & Maintenance Management**:
   - Submit maintenance tickets (Wi-Fi, Plumbing, Electrical, Cleaning, AC, Food).
   - 3-stage visual progress timeline: **Pending Inspection** ➔ **Technician Assigned** ➔ **Resolved & Verified**.
6. **Digital Rental Agreement & Electronic Signature Pad**:
   - Government of Rajasthan E-Stamp Certificate styled lease agreement generator.
   - HTML5 Canvas signature pad for in-browser digital execution with confetti celebration.
7. **Admin & Faculty Analytics Dashboard (Recharts)**:
   - Bar chart for city-wise average rental pricing.
   - Area chart tracking monthly student booking inquiries.
   - Listing moderation queue with 1-click authenticity verification toggles.
8. **Side-by-Side Property Comparison Tool**:
   - Compare up to 3 accommodations across rent, deposit, meals, curfew times, and distance to campus.
9. **Bilingual Localization (English ⇄ हिन्दी)**:
   - Navbar switch translating all UI elements, headings, filters, and prompts.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Leaflet.js, React-Leaflet, Recharts, Lucide Icons, Canvas Confetti |
| **Backend** | Node.js, Express.js (RESTful API architecture) |
| **Database** | MongoDB (Mongoose models) + Resilient Embedded Store Fallback for zero-fail demos |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs password hashing, Role-Based Access Control |
| **APIs & Web Standards**| Web Speech Recognition API, HTML5 Canvas API, OpenStreetMap |

---

## 🚀 Quick Start Guide

The application is pre-configured and ready to run.

### 1. Launch Both Frontend & Backend Together (Root Directory)
```bash

- **React Frontend**: [http://localhost:3000](http://localhost:3000)
- **Express Backend API**: [http://localhost:5001](http://localhost:5001)
- **API Health Check**: [http://localhost:5001/api/health](http://localhost:5001/api/health)

---

### 2. Or Run Independently

#### Start Backend Server:
```bash
cd server
npm start
# Server listens on http://localhost:5001
```

#### Start Frontend Client:
```bash
cd client
npm run dev
# Frontend runs on http://localhost:3000
```

---

## 👤 Instant 1-Click Demo Personas

Smart Stay includes built-in demo profiles switchable in **1 click** directly from the top-right profile dropdown in the navbar:

| Persona | Name | Role | Email |
|---|---|---|---|
| **Student / Tenant** | Yash Tyagi | `tenant` | `yash@smartstay.com` |
| **Hostel Landlord** | Rajesh Sharma | `landlord` | `rajesh@landlord.com` |
| **Faculty Supervisor / Admin** | Admin| `admin` | `admin@smartstay.com` |

*(Default password for manual login: `password123`)*

---

## 📁 Project Directory Structure

```
smart-stay/
├── package.json              # Root script runner (concurrent launch)
├── start.js                  # Node orchestration launcher script
├── README.md                 # Project submission documentation
│
├── server/                   # Node.js + Express Backend
│   ├── .env                  # Environment configuration
│   ├── package.json          # Express, Mongoose, JWT, bcryptjs dependencies
│   ├── data/
│   │   └── smartstay.json    # Persistent database storage
│   └── src/
│       ├── index.js          # Express app entry & routing
│       ├── db.js             # Hybrid MongoDB connection & resilient store adapter
│       ├── store.js          # Asynchronous database layer
│       ├── seedData.js       # Authentic MUJ campus listings & roommate profiles
│       ├── middleware/
│       │   └── auth.js       # JWT validation & role authorization
│       ├── models/           # Mongoose Schemas (User, Listing, Booking, Roommate, Maintenance, Agreement)
│       └── routes/           # REST Route Handlers (auth, listings, roommates, bookings, services, agreements, admin)
│
└── client/                   # React 19 + Vite Frontend
    ├── index.html            # Typography (Outfit, Plus Jakarta Sans) & Leaflet styles
    ├── vite.config.js        # Reverse proxy (/api -> http://localhost:5001)
    ├── package.json          # React, Leaflet, Recharts, Lucide dependencies
    └── src/
        ├── index.css         # Modern CSS design system (Dark/Light tokens, glassmorphism)
        ├── translations.js   # Bilingual English / Hindi dictionary
        ├── App.jsx           # Main application state & view routing
        └── components/
            ├── Navbar.jsx               # Header, theme toggle, language switcher, role switcher
            ├── HeroSection.jsx          # Voice search (SpeechRecognition), filters & metrics
            ├── ListingCard.jsx          # Property card with verified badges & compare trigger
            ├── ListingDetailsModal.jsx  # Room sharing tiers, meals menu, booking form
            ├── MapSearch.jsx            # Leaflet map with custom pins & campus radius
            ├── RoommateMatcher.jsx      # AI compatibility questionnaire & match cards
            ├── ServicesMaintenance.jsx  # Maintenance tickets with 3-stage visual timeline
            ├── DigitalAgreementModal.jsx# Rajasthan E-Stamp layout & canvas signature pad
            ├── CompareDrawer.jsx        # Side-by-side comparison dock & table
            ├── TenantDashboard.jsx      # Bookings, student ID verification uploader
            ├── AdminDashboard.jsx       # Recharts graphs & listing moderation
            └── AddListingModal.jsx      # Landlord property submission form
```

---

## 🧪 REST API Endpoints Summary

- `GET /api/health` — Service health & database connectivity status
- `POST /api/auth/login` — User authentication with JWT
- `POST /api/auth/demo-login` — 1-click persona authorization for demo
- `GET /api/listings` — Filtered accommodation query (city, budget, type, gender, search)
- `POST /api/listings` — Landlord property creation
- `POST /api/listings/compare` — Compare properties by IDs
- `GET /api/roommates` — Roommate profiles catalog
- `POST /api/roommates/match` — Algorithmic compatibility calculation
- `GET /api/bookings` — Active tenant reservations
- `POST /api/bookings` — Request a room booking
- `GET /api/services` — Maintenance & repair tickets
- `POST /api/services` — Log a new hostel issue
- `PATCH /api/services/:id/status` — Advance service status timeline
- `GET /api/agreements` — View digital rental contracts
- `POST /api/agreements/:id/sign` — Affix canvas digital signature
- `GET /api/admin/stats` — Metrics and Recharts data payloads
- `PATCH /api/admin/listings/:id/verify` — Toggle listing authenticity verification

---

**Built with pride by Yash Tyagi**
