import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Eye, ShieldCheck, IndianRupee } from 'lucide-react';

// Create custom SVG Leaflet icon
const createCustomIcon = (price, isVerified) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        background: ${isVerified ? '#4f46e5' : '#1e293b'};
        color: #ffffff;
        font-weight: 800;
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 20px;
        border: 2px solid #ffffff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        gap: 3px;
        white-space: nowrap;
        transform: translate(-50%, -50%);
        font-family: sans-serif;
      ">
        <span>₹${(price / 1000).toFixed(1)}k</span>
      </div>
    `,
    iconSize: [60, 24],
    iconAnchor: [30, 12]
  });
};

const universityCampusIcon = L.divIcon({
  className: 'campus-marker',
  html: `
    <div style="
      background: #dc2626;
      color: #ffffff;
      font-weight: 800;
      font-size: 12px;
      padding: 6px 10px;
      border-radius: 8px;
      border: 2px solid #ffffff;
      box-shadow: 0 4px 14px rgba(220,38,38,0.5);
      white-space: nowrap;
      transform: translate(-50%, -50%);
    ">
      🎓 University Campus
    </div>
  `,
  iconSize: [160, 30],
  iconAnchor: [80, 15]
});

export default function MapSearch({ listings, onViewDetails, t }) {
  const [selectedListing, setSelectedListing] = useState(null);
  const [mapCenter, setMapCenter] = useState([26.8439, 75.5652]); // Campus coordinates
  const [zoomLevel, setZoomLevel] = useState(14);

  // Component to dynamically update map view when center changes
  function MapUpdater({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
      map.flyTo(center, zoom, { duration: 1.5 });
    }, [center, zoom, map]);
    return null;
  }

  const handleSelectProperty = (listing) => {
    setSelectedListing(listing);
    setMapCenter([listing.lat || 26.8439, listing.lng || 75.5652]);
  };

  return (
    <div className="container py-8">
      
      {/* Heading */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary flex items-center gap-2">
            <Navigation className="w-6 h-6 text-indigo-500" />
            <span>Interactive Campus & City Map Search</span>
          </h2>
          <p className="text-sm text-secondary mt-1">
            Explore verified accommodations pinned around the University Campus and surrounding student zones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMapCenter([26.8439, 75.5652])}
            className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
          >
            <MapPin className="w-4 h-4 text-red-500" />
            <span>Recenter at Campus</span>
          </button>
        </div>
      </div>

      {/* Map + Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[650px]">
        
        {/* Left / Sidebar Properties List */}
        <div className="glass-panel p-4 overflow-y-auto space-y-3 h-full border border-color">
          <div className="flex items-center justify-between pb-2 border-b border-color">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              Campus Listings ({listings.length})
            </span>
            <span className="badge badge-verified text-[10px]">Campus Radius</span>
          </div>

          {listings.map(item => (
            <div
              key={item._id || item.id}
              onClick={() => handleSelectProperty(item)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                selectedListing?._id === item._id || selectedListing?.id === item.id
                  ? 'border-indigo-600 bg-indigo-500/10 shadow-md'
                  : 'border-color bg-secondary hover:border-focus'
              }`}
            >
              <img
                src={item.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=200&q=80'}
                alt={item.title}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="badge badge-gender text-[9px] py-0">{item.genderSuitability}</span>
                    <span className="text-[10px] text-emerald-500 font-bold truncate">{item.distanceToCampus}</span>
                  </div>
                  <h4 className="text-xs font-bold text-primary truncate mt-1">{item.title}</h4>
                  <p className="text-[11px] text-muted truncate">{item.address}</p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-color/40">
                  <span className="text-xs font-extrabold text-indigo-500">
                    ₹{Number(item.price).toLocaleString('en-IN')}/mo
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(item);
                    }}
                    className="text-[11px] font-bold text-secondary hover:text-indigo-500 flex items-center gap-0.5"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Interactive Leaflet Map */}
        <div className="lg:col-span-2 glass-panel p-2 overflow-hidden h-full border border-color relative shadow-xl">
          <MapContainer
            center={mapCenter}
            zoom={zoomLevel}
            scrollWheelZoom={true}
            className="w-full h-full rounded-xl"
          >
            <MapUpdater center={mapCenter} zoom={zoomLevel} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* University Campus Landmark Marker */}
            <Marker position={[26.8439, 75.5652]} icon={universityCampusIcon}>
              <Popup>
                <div className="p-1 text-xs">
                  <p className="font-bold text-red-600">🎓 University Campus</p>
                  <p className="text-gray-600 mt-1">Dehmi Kalan, Ajmer Road, Jaipur</p>
                </div>
              </Popup>
            </Marker>

            {/* Campus 2km Safe Commute Radius Circle */}
            <Circle 
              center={[26.8439, 75.5652]} 
              radius={2000} 
              pathOptions={{ color: '#4f46e5', fillColor: '#6366f1', fillOpacity: 0.08 }} 
            />

            {/* Property Markers */}
            {listings.map(item => (
              <Marker
                key={item._id || item.id}
                position={[item.lat || 26.8439, item.lng || 75.5652]}
                icon={createCustomIcon(item.price, item.isVerified)}
                eventHandlers={{
                  click: () => setSelectedListing(item),
                }}
              >
                <Popup>
                  <div className="w-56 p-1">
                    <img 
                      src={item.images?.[0]} 
                      alt={item.title} 
                      className="w-full h-28 object-cover rounded-md mb-2"
                    />
                    <div className="flex items-center gap-1 mb-1">
                      {item.isVerified && (
                        <span className="badge badge-verified text-[9px] py-0">Verified</span>
                      )}
                      <span className="badge badge-gender text-[9px] py-0">{item.genderSuitability}</span>
                    </div>
                    <h4 className="font-bold text-xs text-primary leading-tight line-clamp-1">{item.title}</h4>
                    <p className="text-[10px] text-muted truncate mt-0.5">{item.address}</p>
                    <p className="text-xs font-extrabold text-indigo-600 mt-1.5">
                      ₹{Number(item.price).toLocaleString('en-IN')} /month
                    </p>
                    <button
                      onClick={() => onViewDetails(item)}
                      className="btn-primary w-full text-xs py-1.5 mt-2"
                    >
                      View Details & Book
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}

          </MapContainer>
        </div>

      </div>

    </div>
  );
}
