import React from 'react';
import { Scale, X, Check, Minus, IndianRupee, MapPin } from 'lucide-react';

export default function CompareDrawer({ 
  compareIds, 
  listings, 
  onRemoveCompare, 
  onClearCompare, 
  isOpen, 
  setIsOpen, 
  onBookProperty 
}) {
  const comparedListings = listings.filter(l => compareIds.includes(l._id || l.id));

  if (compareIds.length === 0 && !isOpen) return null;

  return (
    <>
      {/* Floating Dock Indicator */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-bounce">
          <button
            onClick={() => setIsOpen(true)}
            className="btn-primary py-3 px-5 shadow-2xl rounded-full flex items-center gap-2 border-2 border-white/20"
          >
            <Scale className="w-5 h-5" />
            <span className="font-bold">Compare ({compareIds.length}) Properties</span>
          </button>
        </div>
      )}

      {/* Comparison Modal Dialog */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content max-w-4xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-color mb-4">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-500" />
                <h3 className="text-xl font-bold text-primary">Side-by-Side Property Comparison</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={onClearCompare}
                  className="text-xs text-rose-500 hover:underline font-semibold"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary p-1.5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {compareIds.length === 0 ? (
              <div className="py-12 text-center text-muted">
                <Scale className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-bold text-primary">No Properties Selected</p>
                <p className="text-sm mt-2">Select properties from the Explore tab to compare them side-by-side.</p>
                <button onClick={() => setIsOpen(false)} className="btn-primary mt-6 text-xs px-4 py-2">Return to Search</button>
              </div>
            ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-color">
                    <th className="p-3 w-40 text-muted uppercase font-bold">Feature</th>
                    {comparedListings.map(item => (
                      <th key={item._id || item.id} className="p-3 min-w-[220px]">
                        <div className="relative">
                          <img
                            src={item.images?.[0]}
                            alt={item.title}
                            className="w-full h-28 object-cover rounded-lg mb-2"
                          />
                          <button
                            onClick={() => onRemoveCompare(item._id || item.id)}
                            className="absolute top-1 right-1 bg-black/70 hover:bg-rose-600 text-white p-1 rounded-full"
                            title="Remove from comparison"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <h4 className="font-bold text-sm text-primary line-clamp-1">{item.title}</h4>
                          <span className="badge badge-gender text-[9px] mt-1">{item.genderSuitability}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-color">
                  {/* Monthly Rent */}
                  <tr>
                    <td className="p-3 font-bold text-muted">Monthly Rent</td>
                    {comparedListings.map(item => (
                      <td key={item._id || item.id} className="p-3">
                        <span className="text-base font-extrabold text-indigo-500">
                          ₹{Number(item.price).toLocaleString('en-IN')}
                        </span>
                        <span className="text-muted"> /month</span>
                      </td>
                    ))}
                  </tr>

                  {/* Security Deposit */}
                  <tr>
                    <td className="p-3 font-bold text-muted">Security Deposit</td>
                    {comparedListings.map(item => (
                      <td key={item._id || item.id} className="p-3 font-semibold text-primary">
                        ₹{Number(item.deposit || 10000).toLocaleString('en-IN')}
                      </td>
                    ))}
                  </tr>

                  {/* Distance to Campus */}
                  <tr>
                    <td className="p-3 font-bold text-muted">Distance to Campus</td>
                    {comparedListings.map(item => (
                      <td key={item._id || item.id} className="p-3 font-semibold text-emerald-500">
                        📍 {item.distanceToCampus || '1.2 km'}
                      </td>
                    ))}
                  </tr>

                  {/* Curfew Time */}
                  <tr>
                    <td className="p-3 font-bold text-muted">Curfew / Timings</td>
                    {comparedListings.map(item => (
                      <td key={item._id || item.id} className="p-3 text-secondary font-medium">
                        {item.curfewTime || '10:30 PM'}
                      </td>
                    ))}
                  </tr>

                  {/* Meal Plan */}
                  <tr>
                    <td className="p-3 font-bold text-muted">Food / Dining</td>
                    {comparedListings.map(item => (
                      <td key={item._id || item.id} className="p-3 text-secondary">
                        <p className="font-semibold text-primary">{item.foodIncluded ? '✓ Included in rent' : '✗ Self cooking'}</p>
                        <p className="text-[11px] text-muted mt-0.5 line-clamp-2">{item.mealPlan}</p>
                      </td>
                    ))}
                  </tr>

                  {/* Wi-Fi & Speed */}
                  <tr>
                    <td className="p-3 font-bold text-muted">High-Speed Wi-Fi</td>
                    {comparedListings.map(item => (
                      <td key={item._id || item.id} className="p-3 text-emerald-500 font-bold">
                        <Check className="w-4 h-4 inline" /> Fiber 200 Mbps
                      </td>
                    ))}
                  </tr>

                  {/* Air Conditioning */}
                  <tr>
                    <td className="p-3 font-bold text-muted">Air Conditioning</td>
                    {comparedListings.map(item => {
                      const hasAC = item.amenities?.some(a => a.toLowerCase().includes('ac') || a.toLowerCase().includes('air conditioning'));
                      return (
                        <td key={item._id || item.id} className="p-3">
                          {hasAC ? (
                            <span className="text-emerald-500 font-semibold"><Check className="w-4 h-4 inline" /> Available</span>
                          ) : (
                            <span className="text-muted"><Minus className="w-4 h-4 inline" /> Air Cooler Only</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Power Backup */}
                  <tr>
                    <td className="p-3 font-bold text-muted">24x7 Power Backup</td>
                    {comparedListings.map(item => (
                      <td key={item._id || item.id} className="p-3 text-secondary font-medium">
                        <Check className="w-4 h-4 inline text-emerald-500" /> Full Generator Backup
                      </td>
                    ))}
                  </tr>

                  {/* Direct Action */}
                  <tr>
                    <td className="p-3 font-bold text-muted">Booking Action</td>
                    {comparedListings.map(item => (
                      <td key={item._id || item.id} className="p-3">
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            onBookProperty(item);
                          }}
                          className="btn-primary w-full text-xs py-2"
                        >
                          Book This Stay
                        </button>
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
