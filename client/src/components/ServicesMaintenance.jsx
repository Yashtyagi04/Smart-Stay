import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Wifi, 
  Droplet, 
  Zap, 
  Sparkles, 
  X,
  Calendar,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export default function ServicesMaintenance({ user, t }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // New ticket state
  const [category, setCategory] = useState('High-Speed Wi-Fi');
  const [roomNumber, setRoomNumber] = useState('Room 304 (Block B)');
  const [propertyTitle, setPropertyTitle] = useState('Royal Palms Luxury Student Residency');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [preferredSlot, setPreferredSlot] = useState('Tomorrow Morning (10 AM - 1 PM)');

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('smartstay_token');
      const res = await fetch('/api/services', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (data.success) {
        setTickets(data.requests || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('smartstay_token');
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          category,
          roomNumber,
          propertyTitle,
          title,
          description,
          priority,
          preferredSlot
        })
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        setTitle('');
        setDescription('');
        fetchTickets();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdvanceStatus = async (ticketId, nextStatus) => {
    try {
      const token = localStorage.getItem('smartstay_token');
      const res = await fetch(`/api/services/${ticketId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchTickets();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getPriorityBadge = (p) => {
    if (p === 'Urgent') return 'bg-rose-500/15 text-rose-500 border-rose-500/30';
    if (p === 'High') return 'bg-amber-500/15 text-amber-500 border-amber-500/30';
    return 'bg-blue-500/15 text-blue-500 border-blue-500/30';
  };

  return (
    <div className="container py-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-heading flex items-center gap-2">
            <Wrench className="w-6 h-6 text-indigo-500" />
            <span>{t.servicesHeading}</span>
          </h2>
          <p className="text-sm text-secondary mt-1">
            {t.servicesSubtitle}
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{t.newTicketBtn}</span>
        </button>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket) => {
          const isPending = ticket.status === 'pending';
          const isInProgress = ticket.status === 'in_progress';
          const isResolved = ticket.status === 'resolved';

          return (
            <div key={ticket._id || ticket.id} className="glass-panel p-5 sm:p-6 border border-color shadow-sm space-y-4">
              
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-color">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`badge border text-[10px] font-bold ${getPriorityBadge(ticket.priority)}`}>
                    {ticket.priority} Priority
                  </span>
                  <span className="badge bg-tertiary text-secondary text-[10px]">
                    {ticket.category}
                  </span>
                  <span className="text-xs text-muted font-medium">
                    Room: <strong className="text-primary">{ticket.roomNumber}</strong>
                  </span>
                  <span className="text-xs text-muted">
                    • {ticket.propertyTitle}
                  </span>
                </div>

                <div className="text-xs text-muted">
                  Logged by: <strong className="text-primary">{ticket.userName}</strong>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h4 className="text-base font-bold text-primary mb-1">
                  {ticket.title}
                </h4>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  {ticket.description}
                </p>
                {ticket.preferredSlot && (
                  <p className="text-xs text-indigo-500 font-semibold mt-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Preferred Visit Slot: {ticket.preferredSlot}</span>
                  </p>
                )}
              </div>

              {/* Visual 3-Stage Progress Timeline */}
              <div className="pt-2">
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                  
                  {/* Step 1: Pending */}
                  <div className={`p-2 rounded-lg border transition-all ${
                    isPending 
                      ? 'bg-amber-500/15 border-amber-500 text-amber-500' 
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                  }`}>
                    <p className="text-[10px] uppercase tracking-wider">Step 1</p>
                    <p className="text-xs">Pending Inspection</p>
                  </div>

                  {/* Step 2: In Progress */}
                  <div className={`p-2 rounded-lg border transition-all ${
                    isInProgress 
                      ? 'bg-indigo-500/15 border-indigo-500 text-indigo-500' 
                      : isResolved 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
                        : 'bg-tertiary border-color text-muted'
                  }`}>
                    <p className="text-[10px] uppercase tracking-wider">Step 2</p>
                    <p className="text-xs">Technician Assigned</p>
                  </div>

                  {/* Step 3: Resolved */}
                  <div className={`p-2 rounded-lg border transition-all ${
                    isResolved 
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-500' 
                      : 'bg-tertiary border-color text-muted'
                  }`}>
                    <p className="text-[10px] uppercase tracking-wider">Step 3</p>
                    <p className="text-xs">Resolved & Verified</p>
                  </div>

                </div>

                {/* Timeline Notes */}
                {ticket.statusHistory && ticket.statusHistory.length > 0 && (
                  <div className="mt-3 p-3 rounded-lg bg-tertiary/70 text-xs space-y-1">
                    <p className="font-bold text-muted text-[10px] uppercase tracking-wider">Status Log Updates:</p>
                    {ticket.statusHistory.map((h, idx) => (
                      <p key={idx} className="text-secondary flex items-start gap-1">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{h.note || `Status marked ${h.status}`}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Landlord / Admin Action Controls */}
              {(user?.role === 'landlord' || user?.role === 'admin') && (
                <div className="pt-2 border-t border-color flex items-center justify-between">
                  <span className="text-xs text-muted font-bold">
                    Supervisory Action:
                  </span>
                  <div className="flex items-center gap-2">
                    {ticket.status === 'pending' && (
                      <button
                        onClick={() => handleAdvanceStatus(ticket._id || ticket.id, 'in_progress')}
                        className="btn-primary text-xs py-1.5 px-3"
                      >
                        Assign Technician & Dispatch
                      </button>
                    )}
                    {ticket.status === 'in_progress' && (
                      <button
                        onClick={() => handleAdvanceStatus(ticket._id || ticket.id, 'resolved')}
                        className="bg-emerald-600 text-white text-xs py-1.5 px-3 rounded-lg font-bold hover:bg-emerald-700 transition"
                      >
                        Mark Work Resolved
                      </button>
                    )}
                    {ticket.status === 'resolved' && (
                      <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Closed</span>
                      </span>
                    )}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* New Ticket Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content max-w-lg p-6">
            <div className="flex items-center justify-between pb-3 border-b border-color mb-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <Wrench className="w-5 h-5 text-indigo-500" />
                <span>Submit Maintenance / Service Request</span>
              </h3>
              <button onClick={() => setModalOpen(false)} className="btn-secondary p-1.5 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-muted uppercase mb-1">Service Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="text-xs font-semibold"
                  >
                    <option value="High-Speed Wi-Fi">Wi-Fi & Router Issue</option>
                    <option value="Housekeeping / Cleaning">Housekeeping & Cleaning</option>
                    <option value="Plumbing">Plumbing & Geyser</option>
                    <option value="Electrical">Electrical & Power Backup</option>
                    <option value="Air Conditioning">AC Cooling & Filter</option>
                    <option value="Mess / Food">Mess Food Quality Inquiry</option>
                    <option value="Carpentry">Carpentry & Door Lock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted uppercase mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="text-xs font-semibold"
                  >
                    <option value="Low">Low (Within 48 hours)</option>
                    <option value="Medium">Medium (Within 24 hours)</option>
                    <option value="High">High (Same Day)</option>
                    <option value="Urgent">Urgent (Immediate)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-muted uppercase mb-1">Room Number</label>
                  <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    placeholder="e.g. Room 204 Block A"
                    required
                    className="text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted uppercase mb-1">Preferred Time Slot</label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="text-xs font-semibold"
                  >
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                    <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-muted uppercase mb-1">Issue Summary</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Geyser water not heating in bathroom"
                  required
                  className="text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-muted uppercase mb-1">Detailed Description</label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the problem in detail to help the technician arrive with the right tools..."
                  required
                  className="text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-color">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs px-5"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
