import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Utensils, 
  Clock, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle, 
  Users, 
  AlertCircle 
} from 'lucide-react';

export default function ListingDetailsModal({ 
  listing, 
  onClose, 
  onConfirmBooking, 
  user, 
  t 
}) {
  const [selectedSharing, setSelectedSharing] = useState(
    listing.sharingTypes?.[1]?.type || listing.sharingTypes?.[0]?.type || 'Double Sharing AC'
  );
  const [moveInDate, setMoveInDate] = useState(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [durationMonths, setDurationMonths] = useState(6);
  const [message, setMessage] = useState('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!listing) return null;

  const currentPrice = listing.sharingTypes?.find(s => s.type === selectedSharing)?.price || listing.price;

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    onConfirmBooking({
      listingId: listing._id || listing.id,
      sharingType: selectedSharing,
      monthlyRent: currentPrice,
      moveInDate,
      durationMonths: Number(durationMonths),
      message
    });
    setBookingSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-3xl">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-color flex items-center justify-between sticky top-0 bg-secondary z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-verified text-[11px]">{t.verifiedBadge}</span>
              <span className="badge badge-gender text-[11px]">{listing.genderSuitability}</span>
              <span className="badge bg-tertiary text-secondary text-[11px]">{listing.propertyType}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary mt-1">
              {listing.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="btn-secondary p-2 rounded-full text-secondary hover:text-primary"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 space-y-6">
          
          {/* Main Gallery Image */}
          <div className="space-y-2">
            <div className="h-64 sm:h-80 rounded-xl overflow-hidden bg-tertiary">
              <img 
                src={listing.images?.[activeImageIdx] || listing.images?.[0]} 
                alt={listing.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnails Row */}
            {listing.images && listing.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImageIdx === idx ? 'border-indigo-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="glass-panel p-3 border border-color">
              <p className="text-xs text-muted font-bold uppercase">Location & Distance</p>
              <p className="text-sm font-semibold text-primary mt-0.5">{listing.distanceToCampus || 'Near Campus'}</p>
              <p className="text-xs text-secondary truncate">{listing.address}</p>
            </div>

            <div className="glass-panel p-3 border border-color">
              <p className="text-xs text-muted font-bold uppercase">Security & Curfew</p>
              <p className="text-sm font-semibold text-primary mt-0.5">Curfew: {listing.curfewTime || '10:30 PM'}</p>
              <p className="text-xs text-secondary">24/7 CCTV & Biometrics</p>
            </div>

            <div className="glass-panel p-3 border border-color">
              <p className="text-xs text-muted font-bold uppercase">Owner Contact</p>
              <p className="text-sm font-semibold text-primary mt-0.5">{listing.ownerName || 'Hostel Warden'}</p>
              <p className="text-xs text-indigo-500 font-mono">{listing.ownerPhone || '+91 94140 88990'}</p>
            </div>
          </div>

          {/* About & Description */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted mb-1.5">
              Property Overview
            </h4>
            <p className="text-sm text-secondary leading-relaxed">
              {listing.description}
            </p>
          </div>

          {/* Room Sharing Options & Rates */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted mb-2">
              Select Sharing Configuration & Rates
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {listing.sharingTypes?.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSharing(option.type)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedSharing === option.type
                      ? 'border-indigo-600 bg-indigo-500/10'
                      : 'border-color bg-tertiary hover:border-focus'
                  }`}
                >
                  <p className="text-xs font-bold text-primary">{option.type}</p>
                  <p className="text-lg font-extrabold text-indigo-500 mt-1">
                    ₹{Number(option.price).toLocaleString('en-IN')}<span className="text-xs text-muted font-normal">/mo</span>
                  </p>
                  <span className="text-[10px] text-emerald-500 font-semibold">Available for booking</span>
                </div>
              ))}
            </div>
          </div>

          {/* Meals & Hygiene Details */}
          <div className="glass-panel p-4 border border-color">
            <div className="flex items-center gap-2 mb-1.5">
              <Utensils className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-bold text-primary">Meals & Dietary Facilities</h4>
            </div>
            <p className="text-xs sm:text-sm text-secondary">
              {listing.mealPlan || 'Pure and hygienic student meals prepared fresh everyday in stainless steel modular kitchen.'}
            </p>
          </div>

          {/* Full Amenities Grid */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted mb-2">
              Included Amenities & Utilities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {listing.amenities?.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-secondary p-2 rounded-lg bg-tertiary">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules */}
          {listing.rules && listing.rules.length > 0 && (
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted mb-2">
                Hostel Regulations & Code of Conduct
              </h4>
              <ul className="space-y-1.5">
                {listing.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-secondary">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Direct Booking Inquiry Form */}
          <div className="pt-4 border-t border-color">
            <h3 className="text-lg font-bold text-primary mb-3">
              Request Room Reservation
            </h3>

            {bookingSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 text-center font-bold text-sm">
                🎉 Reservation inquiry sent to {listing.ownerName}! Check My Dashboard for updates.
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-muted uppercase mb-1">
                      Expected Move-In Date
                    </label>
                    <input 
                      type="date"
                      value={moveInDate}
                      onChange={(e) => setMoveInDate(e.target.value)}
                      required
                      className="text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted uppercase mb-1">
                      Lease Duration (Months)
                    </label>
                    <select
                      value={durationMonths}
                      onChange={(e) => setDurationMonths(e.target.value)}
                      className="text-sm font-medium"
                    >
                      <option value="3">3 Months (Short Term / Internship)</option>
                      <option value="6">6 Months (1 Academic Semester)</option>
                      <option value="12">12 Months (Full Academic Year)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted uppercase mb-1">
                    Special Inquiries or Room Preferences (Optional)
                  </label>
                  <textarea
                    rows="2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Need high-floor room, quiet study corner, two-wheeler parking slot..."
                    className="text-sm"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xs text-muted">Estimated Monthly Rent:</span>
                    <p className="text-xl font-extrabold text-indigo-500 font-heading">
                      ₹{Number(currentPrice).toLocaleString('en-IN')}<span className="text-xs text-muted font-normal"> /month</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-secondary text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary text-sm px-6"
                    >
                      Submit Reservation Request
                    </button>
                  </div>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
