import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  Building, 
  Users, 
  Calendar, 
  Percent, 
  Activity 
} from 'lucide-react';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];

export default function AdminDashboard({ user, onRefreshListings, t }) {
  const [stats, setStats] = useState(null);
  const [adminListings, setAdminListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStatsAndListings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('smartstay_token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      
      const [statsRes, listingsRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/listings?all=true', { headers })
      ]);
      
      const statsData = await statsRes.json();
      const listingsData = await listingsRes.json();
      
      if (statsData.success) {
        setStats(statsData);
      }
      if (listingsData.success) {
        setAdminListings(listingsData.listings || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsAndListings();
  }, []);

  const handleToggleVerification = async (listingId) => {
    try {
      const token = localStorage.getItem('smartstay_token');
      const res = await fetch(`/api/admin/listings/${listingId}/verify`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchStatsAndListings();
        if (onRefreshListings) onRefreshListings();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const kpis = stats?.kpis || {
    totalListings: adminListings.length,
    verifiedListings: adminListings.filter(l => l.isVerified).length,
    totalUsers: 148,
    verifiedUsers: 132,
    totalBookings: 34,
    approvedBookings: 28,
    occupancyRate: '88.4%',
    activeSupportTickets: 2
  };

  const cityData = stats?.charts?.cityPricingData || [
    { city: 'Campus Area', avgRent: 9400, listingsCount: 4 },
    { city: 'Bangalore', avgRent: 13000, listingsCount: 1 },
    { city: 'Delhi', avgRent: 15000, listingsCount: 1 },
    { city: 'Kota', avgRent: 7200, listingsCount: 1 }
  ];

  const bookingTrends = stats?.charts?.bookingTrends || [
    { month: 'Jun', bookings: 12, inquiries: 25 },
    { month: 'Jul', bookings: 28, inquiries: 60 },
    { month: 'Aug', bookings: 45, inquiries: 92 },
    { month: 'Sep', bookings: 39, inquiries: 78 },
    { month: 'Oct', bookings: 54, inquiries: 110 }
  ];

  const sleepScheduleData = [
    { name: 'Night Owl (AI/Coders)', value: 58 },
    { name: 'Early Bird', value: 24 },
    { name: 'Flexible', value: 18 }
  ];

  return (
    <div className="container py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AIML Department Oversight Portal</span>
          </div>
          <h2 className="text-3xl font-extrabold text-primary font-heading">
            {t.adminHeading}
          </h2>
          <p className="text-sm text-secondary mt-1">
            {t.adminSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge badge-verified py-1.5 px-3 text-xs">
            System Live: Port 5001 • v1.0.0
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 border border-color">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted uppercase">Campus Listings</span>
            <Building className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-extrabold text-primary font-heading mt-2">
            {kpis.totalListings}
          </p>
          <p className="text-xs text-emerald-500 font-semibold mt-1">
            ✓ {kpis.verifiedListings} Verified Stays
          </p>
        </div>

        <div className="glass-panel p-5 border border-color">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted uppercase">Total Students</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-extrabold text-primary font-heading mt-2">
            {kpis.totalUsers}
          </p>
          <p className="text-xs text-indigo-500 font-semibold mt-1">
            {kpis.verifiedUsers} ID Verified
          </p>
        </div>

        <div className="glass-panel p-5 border border-color">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted uppercase">Occupancy Rate</span>
            <Percent className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-500 font-heading mt-2">
            {kpis.occupancyRate}
          </p>
          <p className="text-xs text-muted mt-1">
            Campus Area Hostels
          </p>
        </div>

        <div className="glass-panel p-5 border border-color">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted uppercase">Total Bookings</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-primary font-heading mt-2">
            {kpis.totalBookings}
          </p>
          <p className="text-xs text-emerald-500 font-semibold mt-1">
            {kpis.approvedBookings} Confirmed
          </p>
        </div>
      </div>

      {/* Visual Analytics Charts via Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* City-wise Pricing Bar Chart */}
        <div className="glass-panel p-5 sm:p-6 border border-color">
          <h3 className="text-base font-bold text-primary mb-1">
            {t.cityPricingTrend}
          </h3>
          <p className="text-xs text-muted mb-4">
            Benchmark rental comparison across student hubs
          </p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="city" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                  formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Avg Rent']}
                />
                <Bar dataKey="avgRent" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Booking Inquiries Trend Area Chart */}
        <div className="glass-panel p-5 sm:p-6 border border-color">
          <h3 className="text-base font-bold text-primary mb-1">
            {t.bookingFlowTrend}
          </h3>
          <p className="text-xs text-muted mb-4">
            Pre-semester surge in booking applications
          </p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingTrends} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorInq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBkg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="inquiries" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorInq)" />
                <Area type="monotone" dataKey="bookings" stroke="#10b981" fillOpacity={1} fill="url(#colorBkg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Property Moderation & Verification Table */}
      <div className="glass-panel p-5 sm:p-6 border border-color">
        <div className="flex items-center justify-between pb-4 border-b border-color mb-4">
          <div>
            <h3 className="text-base font-bold text-primary">
              Property Verification & Moderation Queue
            </h3>
            <p className="text-xs text-muted">
              Inspect authenticity of listings before students can reserve
            </p>
          </div>
          <span className="badge badge-trust text-xs">Admin Actions Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-color text-muted uppercase">
                <th className="p-3">Property</th>
                <th className="p-3">Manager / Landlord</th>
                <th className="p-3">Type / Gender</th>
                <th className="p-3">Starting Rent</th>
                <th className="p-3">Trust Status</th>
                <th className="p-3 text-right">Moderation Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-color">
              {[...adminListings].sort((a, b) => {
                // Unverified first
                if (a.isVerified !== b.isVerified) {
                  return a.isVerified ? 1 : -1;
                }
                // Then newest
                return new Date(b.createdAt) - new Date(a.createdAt);
              }).map(item => (
                <tr key={item._id || item.id} className="hover:bg-tertiary/50">
                  <td className="p-3 font-bold text-primary">
                    <div className="flex items-center gap-2">
                      <img 
                        src={item.images?.[0]} 
                        alt="" 
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div>
                        <p>{item.title}</p>
                        <p className="text-[10px] text-muted">{item.address}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-3 text-secondary">
                    <p className="font-semibold text-primary">{item.ownerName}</p>
                    <p className="text-[10px] text-muted">{item.ownerPhone}</p>
                  </td>

                  <td className="p-3">
                    <span className="badge badge-gender text-[9px]">{item.genderSuitability}</span>
                    <span className="badge bg-tertiary text-secondary text-[9px] ml-1">{item.propertyType}</span>
                  </td>

                  <td className="p-3 font-bold text-indigo-500">
                    ₹{Number(item.price).toLocaleString('en-IN')}/mo
                  </td>

                  <td className="p-3">
                    {item.isVerified ? (
                      <span className="badge badge-verified text-[10px] flex items-center gap-1 w-fit">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="badge badge-pending text-[10px] flex items-center gap-1 w-fit">
                        <XCircle className="w-3 h-3" />
                        <span>Unverified</span>
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleToggleVerification(item._id || item.id)}
                      className={`text-xs py-1.5 px-3 rounded-lg font-bold transition-all ${
                        item.isVerified
                          ? 'border border-rose-500/40 text-rose-500 hover:bg-rose-500/10'
                          : 'btn-primary text-[11px] py-1 px-3'
                      }`}
                    >
                      {item.isVerified ? 'Revoke Badge' : 'Approve & Verify'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
