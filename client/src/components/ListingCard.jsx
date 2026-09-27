import React from 'react';
import { 
  MapPin, 
  Star, 
  ShieldCheck, 
  Utensils, 
  Wifi, 
  Wind, 
  Zap, 
  Dumbbell, 
  Lock, 
  Eye, 
  Check, 
  Scale 
} from 'lucide-react';

export default function ListingCard({ 
  listing, 
  onViewDetails, 
  onBookNow, 
  isCompared, 
  onToggleCompare, 
  t 
}) {
  const getAmenityIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('wi-fi') || lower.includes('wifi')) return <Wifi className="w-3.5 h-3.5" />;
    if (lower.includes('ac') || lower.includes('air conditioning')) return <Wind className="w-3.5 h-3.5" />;
    if (lower.includes('meal') || lower.includes('food')) return <Utensils className="w-3.5 h-3.5" />;
    if (lower.includes('power') || lower.includes('backup')) return <Zap className="w-3.5 h-3.5" />;
    if (lower.includes('gym')) return <Dumbbell className="w-3.5 h-3.5" />;
    return <Lock className="w-3.5 h-3.5" />;
  };

  const imageSrc = listing.images && listing.images.length > 0 
    ? listing.images[0] 
    : 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="glass-panel overflow-hidden transition-all duration-300 flex flex-col group hover:border-focus hover:shadow-md">
      
      {/* Property Image with Badges */}
      <div className="relative h-52 overflow-hidden bg-tertiary">
        <img 
          src={imageSrc} 
          alt={listing.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {listing.isVerified && (
            <span className="badge badge-verified">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t.verifiedBadge}
            </span>
          )}
          <span className="badge badge-gender">
            {listing.genderSuitability}
          </span>
          <span className="badge bg-secondary text-primary border border-color shadow-sm">
            {listing.propertyType}
          </span>
        </div>

        {/* Rating Pill */}
        <div className="absolute bottom-3 right-3 bg-secondary px-2.5 py-1 rounded-lg border border-color flex items-center gap-1.5 text-xs font-bold text-primary shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{listing.rating || '4.8'}</span>
          <span className="text-muted font-normal">({listing.reviewCount || 15})</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          
          {/* Title and Distance */}
          <div className="mb-2">
            <h3 className="text-lg font-bold text-primary leading-snug line-clamp-1 group-hover:text-indigo-500 transition-colors">
              {listing.title}
            </h3>
            <p className="text-xs text-muted flex items-center gap-1 mt-1 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
              <span>{listing.address}</span>
            </p>
            {listing.distanceToCampus && (
              <span className="text-[11px] font-semibold text-emerald-500 inline-block mt-0.5">
                📍 {listing.distanceToCampus}
              </span>
            )}
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-1 my-3">
            <span className="text-xs text-muted font-medium">{t.startingFrom}</span>
            <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-heading">
              ₹{Number(listing.price).toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-muted">{t.perMonth}</span>
          </div>

          {/* Amenities Preview */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {listing.amenities && listing.amenities.slice(0, 4).map((amenity, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md bg-tertiary text-secondary"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </span>
            ))}
            {listing.amenities && listing.amenities.length > 4 && (
              <span className="text-[10px] font-bold text-muted px-1.5 py-1">
                +{listing.amenities.length - 4} more
              </span>
            )}
          </div>

        </div>

        {/* Action Buttons Row */}
        <div className="pt-3 border-t border-color flex items-center justify-between gap-2">
          
          {/* Compare Checkbox Toggle */}
          <button
            type="button"
            onClick={() => onToggleCompare(listing._id || listing.id)}
            className={`text-xs px-2.5 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              isCompared 
                ? 'bg-indigo-600 text-white' 
                : 'text-secondary hover:bg-tertiary border border-color'
            }`}
            title="Compare with other properties"
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isCompared ? t.compared : t.compareBtn}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onViewDetails(listing)}
              className="btn-secondary text-xs py-2 px-3 flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t.viewDetails}</span>
            </button>

            <button
              type="button"
              onClick={() => onBookNow(listing)}
              className="btn-primary text-xs py-2 px-3 flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{t.bookNow}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
