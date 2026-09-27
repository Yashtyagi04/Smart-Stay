import React, { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  ShieldCheck, 
  CheckCircle, 
  Clock, 
  FileText, 
  Upload, 
  Building, 
  Wrench,
  Award
} from 'lucide-react';

export default function TenantDashboard({ user, onNavigateToTab, t }) {
  const [bookings, setBookings] = useState([]);
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProps, setLoadingProps] = useState(false);
  const [docUploaded, setDocUploaded] = useState(false);
  const [docVerifying, setDocVerifying] = useState(false);
  const [docType, setDocType] = useState('Government Aadhaar Card');

  useEffect(() => {
    setDocType('Government Aadhaar Card');
  }, [user?.role]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('smartstay_token');
      const res = await fetch('/api/bookings', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyProperties = async () => {
    if (user?.role !== 'landlord') return;
    setLoadingProps(true);
    try {
      const token = localStorage.getItem('smartstay_token');
      const res = await fetch('/api/listings/my-properties', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (data.success) {
        setMyProperties(data.listings || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProps(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchMyProperties();
  }, [user]);

  const handleApproveBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('smartstay_token');
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'approved' })
      });
      const data = await res.json();
      if (data.success) {
        setBookings(bookings.map(b => (b._id === bookingId || b.id === bookingId) ? { ...b, status: 'approved' } : b));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSimulateDocUpload = (e) => {
    e.preventDefault();
    setDocVerifying(true);
    setTimeout(() => {
      setDocVerifying(false);
      setDocUploaded(true);
    }, 1500);
  };

  return (
    <div className="container py-8 space-y-8">
      
      {/* Top Profile Header Card */}
      <div className="glass-panel p-6 border border-color shadow-lg flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative">
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
              alt={user?.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-indigo-500 shadow-xl"
            />
            <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow">
              <ShieldCheck className="w-5 h-5" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-extrabold text-primary font-heading">{user?.name}</h2>
              <span className="badge badge-verified text-xs">
                {user?.role === 'landlord' ? 'Verified Owner' : 'Verified Resident'}
              </span>
              <span className="badge badge-trust text-xs">SmartStay Certified</span>
            </div>
            
            <p className="text-sm text-secondary font-medium">
              {user?.role === 'landlord' 
                ? '🏠 Property Manager & Owner' 
                : `🎓 ${user?.college || 'University'} • ${user?.course || 'Computer Science'}`}
            </p>
            <p className="text-xs text-muted">
              {user?.email} • {user?.phone || '+91 98290 12345'}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                ✓ {user?.role === 'landlord' ? 'Owner Identity Verified' : 'Student ID Verified'}
              </span>
              <span className="text-[11px] font-semibold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-md">
                ✓ Active Rental {user?.role === 'landlord' ? 'Properties' : 'Agreement'} On File
              </span>
            </div>
          </div>
        </div>

        {/* Quick Nav Shortcuts */}
        <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
          {user?.role !== 'landlord' && (
            <>
              <button
                onClick={() => onNavigateToTab('agreements')}
                className="btn-secondary text-xs py-2 px-3 flex-1 flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-indigo-500" />
                <span>View Lease Agreement</span>
              </button>
              <button
                onClick={() => onNavigateToTab('services')}
                className="btn-secondary text-xs py-2 px-3 flex-1 flex items-center justify-center gap-1.5"
              >
                <Wrench className="w-4 h-4 text-amber-500" />
                <span>Request Maintenance</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Grid: My Bookings & Document Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: My Bookings & Inquiries */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              <span>{user?.role === 'landlord' ? 'My Properties Bookings & Inquiries' : 'My Accommodation Bookings & Inquiries'}</span>
            </h3>
            <span className="text-xs text-muted">{bookings.length} reservations</span>
          </div>

          {bookings.length === 0 ? (
            <div className="glass-panel p-8 text-center text-muted border border-color">
              <p className="text-sm">No active reservations found.</p>
              {user?.role !== 'landlord' && (
                <button
                  onClick={() => onNavigateToTab('explore')}
                  className="btn-primary text-xs py-2 px-4 mt-3"
                >
                  Browse Accommodations
                </button>
              )}
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b._id || b.id}
                className="glass-panel p-5 border border-color shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-color">
                  <div>
                    <h4 className="text-base font-bold text-primary">{b.listingTitle}</h4>
                    <p className="text-xs text-muted">{b.listingAddress}</p>
                  </div>
                  <span className={`badge text-xs font-bold ${
                    b.status === 'approved' 
                      ? 'badge-verified' 
                      : b.status === 'pending' 
                        ? 'badge-pending' 
                        : 'bg-rose-500/15 text-rose-500 border-rose-500/30'
                  }`}>
                    {b.status === 'approved' 
                      ? '✓ Booking Confirmed' 
                      : user?.role === 'landlord' 
                        ? '⏳ Action Required' 
                        : '⏳ Pending Landlord Approval'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-muted block">Sharing Tier</span>
                    <strong className="text-primary">{b.sharingType}</strong>
                  </div>
                  <div>
                    <span className="text-muted block">Monthly Rent</span>
                    <strong className="text-indigo-500 font-extrabold">₹{Number(b.monthlyRent).toLocaleString('en-IN')}/mo</strong>
                  </div>
                  <div>
                    <span className="text-muted block">Move-in Date</span>
                    <strong className="text-primary">{b.moveInDate}</strong>
                  </div>
                  <div>
                    <span className="text-muted block">Duration</span>
                    <strong className="text-primary">{b.durationMonths} Months</strong>
                  </div>
                </div>

                {b.message && (
                  <p className="text-xs text-secondary bg-tertiary p-2.5 rounded-lg">
                    <span className="font-bold text-muted">{user?.role === 'landlord' ? 'Tenant Note:' : 'My Inquiry Note:'}</span> "{b.message}"
                  </p>
                )}

                {user?.role === 'landlord' && b.status === 'pending' && (
                  <div className="pt-2 mt-2 border-t border-color flex justify-end">
                    <button
                      onClick={() => handleApproveBooking(b._id || b.id)}
                      className="btn-primary py-1.5 px-4 text-xs flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve Booking
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* My Properties List (Landlord Only) */}
        {user?.role === 'landlord' && (
          <div className="md:col-span-2 glass-panel p-6 border border-color shadow-sm flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between pb-1 mb-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <Building className="w-5 h-5 text-emerald-500" />
                <span>My Property Listings</span>
              </h3>
              <span className="text-xs text-muted">{myProperties.length} properties</span>
            </div>

            {loadingProps ? (
              <div className="flex-1 flex flex-col items-center justify-center text-muted">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-xs font-semibold">Loading your properties...</p>
              </div>
            ) : myProperties.length === 0 ? (
              <div className="glass-panel p-8 text-center text-muted border border-color mt-2">
                <p className="text-sm mb-3">You haven't posted any properties yet.</p>
                <button
                  onClick={() => window.dispatchEvent(new Event('open-add-listing'))}
                  className="btn-primary text-xs py-2 px-4"
                >
                  Post a Property
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myProperties.map((p) => (
                  <div key={p._id || p.id} className="glass-panel p-4 border border-color hover:border-focus transition-colors flex gap-3">
                    <img 
                      src={p.images && p.images[0] ? p.images[0] : 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5'} 
                      alt={p.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h4 className="text-sm font-bold text-primary line-clamp-1">{p.title}</h4>
                        <p className="text-xs text-secondary mt-0.5 line-clamp-1">{p.address}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-bold text-indigo-500">₹{p.price}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.isVerified ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                          {p.isVerified ? 'Verified' : 'Pending Verification'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Right Col: Instant Document Verification Card */}
        <div className="space-y-4">
          <div className="glass-panel p-6 border border-color shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-color">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-primary">
                {user?.role === 'landlord' ? 'Owner Document Verification' : 'Student Document Verification'}
              </h3>
            </div>

            <p className="text-xs text-secondary leading-relaxed">
              Upload your official {user?.role === 'landlord' ? 'Property Ownership Document or Aadhaar' : 'Student Registration Card or Aadhaar'} to receive a public 
              <strong> Verified {user?.role === 'landlord' ? 'Owner' : 'Resident'} Badge</strong> and zero security surcharge.
            </p>

            {docUploaded ? (
              <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 text-center space-y-2">
                <CheckCircle className="w-10 h-10 mx-auto" />
                <p className="font-bold text-sm">Identity & College Verified!</p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                  Government ID validated. Trust score updated to 100%.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSimulateDocUpload} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-muted uppercase mb-1">
                    Document Type
                  </label>
                  <select 
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="text-xs font-semibold"
                  >
                    {user?.role === 'landlord' ? (
                      <>
                        <option>Property Tax Receipt</option>
                        <option>Electricity Bill (Owner Name)</option>
                        <option>Government Aadhaar Card</option>
                        <option>PAN Card</option>
                      </>
                    ) : (
                      <>
                        <option>University Student ID</option>
                        <option>Government Aadhaar Card</option>
                        <option>PAN Card</option>
                        <option>Passport / Driving License</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted uppercase mb-1">
                    {docType === 'Government Aadhaar Card' ? 'Aadhaar Number' :
                     docType === 'PAN Card' ? 'PAN Number' : 
                     'Registration / Roll Number'}
                  </label>
                  <input
                    type="text"
                    defaultValue="23FE10CAI00376"
                    className="text-xs font-mono font-bold"
                  />
                </div>

                <div className="border-2 border-dashed border-color rounded-xl p-4 text-center cursor-pointer hover:border-focus bg-tertiary">
                  <Upload className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-primary">Click to upload document photo</p>
                  <p className="text-[10px] text-muted">Supports PNG, JPG, or PDF up to 5MB</p>
                </div>

                <button
                  type="submit"
                  disabled={docVerifying}
                  className="btn-primary w-full text-xs py-2.5"
                >
                  {docVerifying ? 'Validating Document...' : 'Submit for Instant Verification'}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
