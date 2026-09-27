import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Mic, 
  MicOff, 
  MapPin, 
  SlidersHorizontal, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  IndianRupee,
  Navigation
} from 'lucide-react';

export default function HeroSection({ 
  searchQuery, 
  setSearchQuery, 
  selectedCity, 
  setSelectedCity, 
  selectedType, 
  setSelectedType, 
  selectedGender, 
  setSelectedGender, 
  maxPrice, 
  setMaxPrice, 
  onTriggerSearch, 
  t, 
  lang 
}) {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [voiceNotice, setVoiceNotice] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      setVoiceNotice(t.voiceListening);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setVoiceNotice(`Heard: "${transcript}"`);
        setIsListening(false);
        setTimeout(() => {
          setVoiceNotice('');
          onTriggerSearch(transcript);
        }, 1200);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        setVoiceNotice('Voice recognition paused. Try again or type your query.');
        setTimeout(() => setVoiceNotice(''), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const quickFilterTags = [
    { label: 'Opp. Main Gate', query: 'Main Gate' },
    { label: 'Girls AC Deluxe', query: 'Girls' },
    { label: 'Under ₹8,000/mo', action: () => setMaxPrice(8000) },
    { label: 'Meals Included', query: 'Meals' },
    { label: 'Boys Hostel', query: 'Boys' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 bg-primary">
      <div className="container">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary leading-tight mb-4">
            {t.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto mb-8">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Central Search Box Glass Container */}
        <div className="glass-panel p-6 max-w-4xl mx-auto">
          
          {/* Top Search Input with Voice Button */}
          <div className="relative mb-4 flex items-center">
            <div className="absolute left-4 text-muted pointer-events-none">
              <Search className="w-5 h-5 text-indigo-500" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onTriggerSearch(searchQuery)}
              placeholder={t.searchPlaceholder}
              className="pl-12 pr-14 py-3.5 text-base sm:text-lg rounded-xl font-medium"
            />

            {/* Voice Search Button with Animated Mic */}
            <button
              type="button"
              onClick={handleVoiceSearch}
              title={t.voiceSearchTooltip}
              className={`absolute right-2 p-2.5 rounded-lg transition-all ${
                isListening 
                  ? 'voice-recording' 
                  : 'bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600 hover:text-white'
              }`}
            >
              {isListening ? <Mic className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>

          {/* Voice status banner */}
          {voiceNotice && (
            <div className="mb-4 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 text-xs font-semibold flex items-center justify-between animate-pulse">
              <span>🎙️ {voiceNotice}</span>
              {isListening && <span className="text-[10px] uppercase font-bold text-red-500">Live Recording</span>}
            </div>
          )}

          {/* Multi-criteria filter dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            
            {/* City Selection */}
            <div>
              <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">
                City / Location
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="text-sm font-semibold"
              >
                <option value="All">{t.allCities}</option>
                <option value="Jaipur">Jaipur (Campus & City Area)</option>
                <option value="Bangalore">Bangalore (Koramangala & HSR)</option>
                <option value="Delhi">Delhi (Hauz Khas & North Campus)</option>
                <option value="Kota">Kota (Landmark City)</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="text-sm font-semibold"
              >
                <option value="All">{t.allTypes}</option>
                <option value="Hostel">Hostel (Student Campus)</option>
                <option value="PG">Paying Guest (PG)</option>
                <option value="Flat">Independent Flat / Studio</option>
              </select>
            </div>

            {/* Gender Suitability */}
            <div>
              <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">
                Gender Filter
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="text-sm font-semibold"
              >
                <option value="All">{t.allGenders}</option>
                <option value="Boys">{t.filterBoys}</option>
                <option value="Girls">{t.filterGirls}</option>
                <option value="Co-ed">{t.filterCoed}</option>
              </select>
            </div>

            {/* Max Budget Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-muted uppercase tracking-wider">
                  {t.budgetLabel}
                </label>
                <span className="text-xs font-extrabold text-indigo-500">
                  ₹{Number(maxPrice).toLocaleString('en-IN')}/mo
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="cursor-pointer"
                style={{ height: '6px', marginTop: '8px' }}
              />
            </div>

          </div>

          {/* Quick Filter Tag Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-color">
            <span className="text-xs text-muted font-bold flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
              Quick:
            </span>
            {quickFilterTags.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (tag.action) tag.action();
                  if (tag.query) {
                    setSearchQuery(tag.query);
                    onTriggerSearch(tag.query);
                  }
                }}
                className="text-xs px-2.5 py-1 rounded-md bg-tertiary hover:bg-indigo-500/10 hover:text-indigo-500 font-medium transition-all"
              >
                {tag.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => onTriggerSearch(searchQuery)}
              className="btn-primary text-sm py-2 px-5 ml-auto w-full sm:w-auto"
            >
              <Search className="w-4 h-4" />
              <span>{t.searchBtn}</span>
            </button>
          </div>

        </div>

        {/* 4 Trust Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
          <div className="glass-panel p-4 text-center border border-color">
            <p className="text-xl sm:text-2xl font-extrabold font-heading text-primary">{t.statBeds}</p>
            <p className="text-xs text-muted font-medium mt-0.5">{t.statBedsSub}</p>
          </div>
          <div className="glass-panel p-4 text-center border border-color">
            <p className="text-xl sm:text-2xl font-extrabold font-heading text-indigo-500">{t.statMatch}</p>
            <p className="text-xs text-muted font-medium mt-0.5">{t.statMatchSub}</p>
          </div>
          <div className="glass-panel p-4 text-center border border-color">
            <p className="text-xl sm:text-2xl font-extrabold font-heading text-emerald-500">{t.statBrokerage}</p>
            <p className="text-xs text-muted font-medium mt-0.5">{t.statBrokerageSub}</p>
          </div>
          <div className="glass-panel p-4 text-center border border-color">
            <p className="text-xl sm:text-2xl font-extrabold font-heading text-primary">{t.statSecurity}</p>
            <p className="text-xs text-muted font-medium mt-0.5">{t.statSecuritySub}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
