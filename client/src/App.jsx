import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ListingCard from './components/ListingCard';
import ListingDetailsModal from './components/ListingDetailsModal';
import MapSearch from './components/MapSearch';
import RoommateMatcher from './components/RoommateMatcher';
import ServicesMaintenance from './components/ServicesMaintenance';
import DigitalAgreementModal from './components/DigitalAgreementModal';
import CompareDrawer from './components/CompareDrawer';
import AdminDashboard from './components/AdminDashboard';
import TenantDashboard from './components/TenantDashboard';
import AddListingModal from './components/AddListingModal';
import AuthModal from './components/AuthModal';
import { translations } from './translations';
import { 
  Building2, 
  ArrowUpDown, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  PhoneCall,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('explore'); // explore, map, roommates, services, compare, agreements, dashboard, admin
  const [theme, setTheme] = useState(() => localStorage.getItem('smartstay_theme') || 'dark');
  const [lang, setLang] = useState(() => localStorage.getItem('smartstay_lang') || 'en');
  const t = translations[lang] || translations.en;

  // User state
  const [user, setUser] = useState(null);

  // Listings & Filter States
  const [listings, setListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState('newest');

  // Modals & Drawers
  const [activeListingModal, setActiveListingModal] = useState(null);
  const [addListingModalOpen, setAddListingModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Handle Theme Toggle
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('smartstay_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Handle Language Change
  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('smartstay_lang', newLang);
  };

  // Show quick toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Fetch listings from backend
  const fetchListings = async (query = searchQuery) => {
    setLoadingListings(true);
    try {
      const params = new URLSearchParams();
      if (selectedCity && selectedCity !== 'All') params.append('city', selectedCity);
      if (selectedType && selectedType !== 'All') params.append('type', selectedType);
      if (selectedGender && selectedGender !== 'All') params.append('gender', selectedGender);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (sortBy) params.append('sortBy', sortBy);
      if (query) params.append('search', query);

      const res = await fetch(`/api/listings?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setListings(data.listings || []);
      }
    } catch (err) {
      console.error('Listings error:', err);
    } finally {
      setLoadingListings(false);
    }
  };

  // Initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('smartstay_token');
      if (token) {
        try {
          const res = await fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            setUser(data.user);
          } else {
            localStorage.removeItem('smartstay_token');
          }
        } catch (err) {
          console.error('Auth check error:', err);
        }
      }
    };
    checkAuth();
    fetchListings();
  }, []);

  // Re-fetch when filters change
  useEffect(() => {
    fetchListings();
  }, [selectedCity, selectedType, selectedGender, maxPrice, sortBy]);

  // Auth Handlers
  const handleLogin = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    
    localStorage.setItem('smartstay_token', data.token);
    setUser(data.user);
    showToast(data.message);
  };

  const handleSignup = async (name, email, password, role) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    
    localStorage.setItem('smartstay_token', data.token);
    setUser(data.user);
    showToast(data.message);
  };

  const handleLogout = () => {
    localStorage.removeItem('smartstay_token');
    setUser(null);
    setCurrentTab('explore');
    showToast('Logged out successfully');
  };

  // Toggle compare selection
  const handleToggleCompare = (id) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter(item => item !== id));
      showToast('Removed property from comparison list');
    } else {
      if (compareIds.length >= 3) {
        alert('You can compare up to 3 properties simultaneously.');
        return;
      }
      setCompareIds([...compareIds, id]);
      showToast('Added property to comparison list!');
    }
  };

  // Submit booking request
  const handleConfirmBooking = async (bookingData) => {
    try {
      const token = localStorage.getItem('smartstay_token');
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(bookingData)
      });
      const data = await res.json();
      if (data.success) {
        showToast(`🎉 Reservation request sent for ${activeListingModal?.title}!`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary text-primary">
      
      {/* Top Banner Notice removed */}

      {/* Global Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'compare') {
            setCompareModalOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        lang={lang}
        setLang={handleSetLang}
        theme={theme}
        toggleTheme={toggleTheme}
        t={t}
        compareCount={compareIds.length}
        onOpenAddListing={() => setAddListingModalOpen(true)}
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-secondary border border-color p-4 shadow-lg flex items-center gap-3 rounded-lg max-w-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <p className="text-sm font-medium text-primary">{toastMessage}</p>
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* Tab 1: Explore Accommodations */}
        {currentTab === 'explore' && (
          <div>
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onTriggerSearch={(q) => fetchListings(q)}
              t={t}
              lang={lang}
            />

            {/* Listings Grid Section */}
            <section className="container py-8">
              
              {/* Filter bar and Sort Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-color">
                <div>
                  <h2 className="text-2xl font-extrabold text-primary font-heading">
                    {t.propertiesHeading}
                  </h2>
                  <p className="text-xs text-muted mt-0.5">
                    Showing {listings.length} verified accommodations
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted font-bold flex items-center gap-1">
                    <ArrowUpDown className="w-3.5 h-3.5" />
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs font-semibold py-1.5 px-3 rounded-lg"
                  >
                    <option value="rating">Top Rated & Verified</option>
                    <option value="price-low">Rent: Low to High</option>
                    <option value="price-high">Rent: High to Low</option>
                    <option value="newest">Recently Listed</option>
                  </select>
                </div>
              </div>

              {/* Grid of Listings */}
              {loadingListings ? (
                <div className="py-20 text-center">
                  <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm font-semibold text-muted">Retrieving verified properties...</p>
                </div>
              ) : listings.length === 0 ? (
                <div className="glass-panel p-12 text-center max-w-lg mx-auto border border-color">
                  <Building2 className="w-12 h-12 text-muted mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-primary">No accommodations match your criteria</h3>
                  <p className="text-xs text-muted mt-1">Try adjusting your budget slider or resetting city filters.</p>
                  <button
                    onClick={() => {
                      setSelectedCity('All');
                      setSelectedType('All');
                      setSelectedGender('All');
                      setMaxPrice(100000);
                      setSearchQuery('');
                    }}
                    className="btn-primary text-xs py-2 px-4 mt-4"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map(item => (
                    <ListingCard
                      key={item._id || item.id}
                      listing={item}
                      onViewDetails={(prop) => setActiveListingModal(prop)}
                      onBookNow={(prop) => setActiveListingModal(prop)}
                      isCompared={compareIds.includes(item._id || item.id)}
                      onToggleCompare={handleToggleCompare}
                      t={t}
                    />
                  ))}
                </div>
              )}

            </section>
          </div>
        )}

        {/* Tab 2: Map-based Search */}
        {currentTab === 'map' && (
          <MapSearch
            listings={listings}
            onViewDetails={(prop) => setActiveListingModal(prop)}
            t={t}
          />
        )}

        {/* Tab 3: Roommate Matching Algorithm */}
        {currentTab === 'roommates' && (
          <RoommateMatcher
            user={user}
            t={t}
          />
        )}

        {/* Tab 4: Services and Maintenance */}
        {currentTab === 'services' && (
          <ServicesMaintenance
            user={user}
            t={t}
          />
        )}

        {/* Tab 5: Digital Rental Agreement */}
        {currentTab === 'agreements' && (
          <DigitalAgreementModal
            user={user}
            t={t}
          />
        )}

        {/* Tab 6: Tenant Dashboard */}
        {currentTab === 'dashboard' && (
          user ? (
            <TenantDashboard
              user={user}
              onNavigateToTab={(tab) => setCurrentTab(tab)}
              t={t}
            />
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-xl font-bold mb-4">Please Sign In</h2>
              <button onClick={() => setAuthModalOpen(true)} className="btn-primary py-2 px-6">Sign In</button>
            </div>
          )
        )}

        {/* Tab 7: Admin Dashboard */}
        {currentTab === 'admin' && (
          user ? (
            <AdminDashboard
              user={user}
              listings={listings}
              onRefreshListings={fetchListings}
              t={t}
            />
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-xl font-bold mb-4">Please Sign In</h2>
              <button onClick={() => setAuthModalOpen(true)} className="btn-primary py-2 px-6">Sign In</button>
            </div>
          )
        )}

      </main>

      {/* Floating Compare Drawer & Modal */}
      <CompareDrawer
        compareIds={compareIds}
        listings={listings}
        onRemoveCompare={(id) => handleToggleCompare(id)}
        onClearCompare={() => setCompareIds([])}
        isOpen={compareModalOpen}
        setIsOpen={setCompareModalOpen}
        onBookProperty={(prop) => setActiveListingModal(prop)}
      />

      {/* Property Details & Booking Modal */}
      {activeListingModal && (
        <ListingDetailsModal
          listing={activeListingModal}
          onClose={() => setActiveListingModal(null)}
          onConfirmBooking={handleConfirmBooking}
          user={user}
          t={t}
        />
      )}

      {/* Landlord Add Listing Modal */}
      <AddListingModal
        isOpen={addListingModalOpen}
        onClose={() => setAddListingModalOpen(false)}
        onListingCreated={(newListing) => {
          showToast(`✓ Listing "${newListing.title}" posted successfully!`);
          fetchListings();
        }}
        user={user}
      />

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      {/* Footer */}
      <footer className="border-t border-color bg-secondary py-10 mt-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                  S
                </div>
                <span className="text-base font-extrabold text-primary font-heading">Smart Stay</span>
              </div>
              <p className="text-muted leading-relaxed">
                Centralized student housing ecosystem. Eliminating brokerages, validating authentic listings, and calculating AI roommate compatibility.
              </p>
            </div>

            <div>
              <p className="font-bold text-primary uppercase tracking-wider mb-2.5">Features</p>
              <ul className="space-y-1.5 text-muted">
                <li>Verified Properties</li>
                <li>Digital Agreements</li>
                <li>Roommate Matching</li>
                <li>Maintenance Tracking</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-primary uppercase tracking-wider mb-2.5">Resources</p>
              <ul className="space-y-1.5 text-muted">
                <li>Help Center</li>
                <li>Safety Guidelines</li>
                <li>Community Rules</li>
                <li>Contact Support</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-primary uppercase tracking-wider mb-2.5">Technology Stack</p>
              <ul className="space-y-1.5 text-muted">
                <li>Frontend: React 19 + Leaflet + Recharts</li>
                <li>Backend: Node.js + Express.js REST API</li>
                <li>Database: MongoDB (Mongoose) + Hybrid Store</li>
                <li>Features: Web Speech API, E-Signature, i18n</li>
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-color flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted gap-2">
            <p>© 2026 Smart Stay. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span className="badge badge-verified text-[10px]">Zero Brokerage</span>
              <span className="badge badge-trust text-[10px]">Bilingual Ready</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
