import React, { useState, useEffect } from 'react';
import { PlusCircle, X, Check, Building, MapPin, IndianRupee } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const pinIcon = L.divIcon({
  className: 'custom-pin',
  html: `<div style="background-color: #ef4444; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

export default function AddListingModal({ isOpen, onClose, onListingCreated, user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [propertyType, setPropertyType] = useState('PG');
  const [genderSuitability, setGenderSuitability] = useState('Co-ed');
  const [city, setCity] = useState('Jaipur');
  const [address, setAddress] = useState('Near University Gate 1');
  const [landmark, setLandmark] = useState('Near Campus');
  const [price, setPrice] = useState(8500);
  const [deposit, setDeposit] = useState(10000);
  const [distanceToCampus, setDistanceToCampus] = useState('500 meters from Campus');
  const [curfewTime, setCurfewTime] = useState('10:30 PM');
  const [foodIncluded, setFoodIncluded] = useState(true);
  const [mealPlan, setMealPlan] = useState('3-time hygienic North and South Indian home-style meals with Sunday feast.');
  const [images, setImages] = useState([]);
  const [position, setPosition] = useState([26.8439, 75.5652]); // Default campus coordinates

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return position === null ? null : (
      <Marker position={position} icon={pinIcon}></Marker>
    );
  }

  const [selectedAmenities, setSelectedAmenities] = useState([
    'High-Speed Wi-Fi',
    'Air Conditioning',
    '3-Time Meals',
    'Power Backup 24x7',
    'Daily Housekeeping',
    'Biometric & CCTV Access'
  ]);

  const allAmenities = [
    'High-Speed Wi-Fi',
    'Air Conditioning',
    '3-Time Meals',
    'Power Backup 24x7',
    'Gym & Fitness Studio',
    'Daily Housekeeping',
    'Biometric & CCTV Access',
    'Attached Washroom',
    'Laundry Service',
    'Study Lounge',
    'Free University Shuttle'
  ];

  if (!isOpen) return null;

  const toggleAmenity = (a) => {
    if (selectedAmenities.includes(a)) {
      setSelectedAmenities(selectedAmenities.filter(item => item !== a));
    } else {
      setSelectedAmenities([...selectedAmenities, a]);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    });

    Promise.all(promises).then(base64Images => {
      setImages(prev => [...prev, ...base64Images]);
    }).catch(err => console.error("Error converting images:", err));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('smartstay_token');
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          title,
          description,
          propertyType,
          genderSuitability,
          city,
          address,
          landmark,
          price: Number(price),
          deposit: Number(deposit),
          distanceToCampus,
          curfewTime,
          foodIncluded,
          mealPlan,
          amenities: selectedAmenities,
          lat: position[0],
          lng: position[1],
          images: images.length > 0 ? images : [
            'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
          ]
        })
      });
      const data = await res.json();
      if (data.success) {
        onListingCreated(data.listing);
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-2xl p-6">
        <div className="flex items-center justify-between pb-3 border-b border-color mb-4">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-primary">Post New Student Accommodation</h3>
          </div>
          <button onClick={onClose} className="btn-secondary p-1.5 rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1">Listing Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Apex Residency - Boys AC Hostel"
              required
              className="text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="text-xs font-semibold"
              >
                <option value="PG">Paying Guest (PG)</option>
                <option value="Hostel">Hostel</option>
                <option value="Flat">Independent Flat</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1">Gender Suitability</label>
              <select
                value={genderSuitability}
                onChange={(e) => setGenderSuitability(e.target.value)}
                className="text-xs font-semibold"
              >
                <option value="Boys">Boys Only</option>
                <option value="Girls">Girls Only</option>
                <option value="Co-ed">Co-ed Living</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1">City Hub</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="text-xs font-semibold"
              >
                <option value="Jaipur">Jaipur (Campus Area)</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Delhi">Delhi</option>
                <option value="Kota">Kota</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1">Monthly Starting Rent (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1">Security Deposit (₹)</label>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                required
                className="text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1">Address & Landmarks</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1">Distance to Campus</label>
              <input
                type="text"
                value={distanceToCampus}
                onChange={(e) => setDistanceToCampus(e.target.value)}
                placeholder="e.g. 400m from Gate 2"
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1">Night Curfew Time</label>
              <input
                type="text"
                value={curfewTime}
                onChange={(e) => setCurfewTime(e.target.value)}
                placeholder="e.g. 10:30 PM"
                className="text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1">Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Highlight rooms, security, food hygiene, study ambience..."
              required
              className="text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">Amenities Included</label>
            <div className="flex flex-wrap gap-1.5">
              {allAmenities.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    selectedAmenities.includes(amenity)
                      ? 'border-indigo-600 bg-indigo-600 text-white font-semibold'
                      : 'border-color bg-tertiary text-secondary hover:border-focus'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">Pinpoint Location</label>
            <p className="text-[10px] text-muted mb-2">Click on the map to set the exact property location</p>
            <div className="h-48 w-full rounded-xl overflow-hidden border border-color shadow-sm relative z-0">
              <MapContainer
                center={[26.8439, 75.5652]}
                zoom={14}
                scrollWheelZoom={true}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
              </MapContainer>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">Hostel Photos</label>
            <div className="flex flex-col gap-2">
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="text-xs file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              />
              {images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative flex-shrink-0">
                      <img src={img} alt={`Preview ${idx}`} className="w-16 h-16 object-cover rounded shadow-sm border border-color" />
                      <button 
                        type="button" 
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-color">
            <button type="button" onClick={onClose} className="btn-secondary text-xs">
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs px-5">
              Publish Accommodation Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
