import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Sparkles, 
  Moon, 
  Sun, 
  Clock, 
  Utensils, 
  BookOpen, 
  Heart, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  X,
  MessageCircle,
  Percent
} from 'lucide-react';

export default function RoommateMatcher({ user, t }) {
  const [budget, setBudget] = useState(10000);
  const [sleepSchedule, setSleepSchedule] = useState('Night Owl');
  const [dietaryPreference, setDietaryPreference] = useState('Vegetarian');
  const [cleanliness, setCleanliness] = useState(4);
  const [studyHabit, setStudyHabit] = useState('Silent Study');
  const [gender, setGender] = useState('Any');
  const [selectedHobbies, setSelectedHobbies] = useState(['Machine Learning', 'Competitive Coding']);

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connectModalProfile, setConnectModalProfile] = useState(null);
  const [connectMessage, setConnectMessage] = useState('');
  const [connectSuccess, setConnectSuccess] = useState(false);

  const allHobbies = [
    'Machine Learning', 
    'Competitive Coding', 
    'Gaming (Valorant)', 
    'Gym & Fitness', 
    'Football', 
    'Music Production', 
    'Reading Novels', 
    'UI/UX Design', 
    'Cricket'
  ];

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/roommates/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget: Number(budget),
          sleepSchedule,
          dietaryPreference,
          cleanliness: Number(cleanliness),
          studyHabit,
          gender,
          hobbies: selectedHobbies
        })
      });
      const data = await res.json();
      if (data.success) {
        setMatches(data.matches || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const toggleHobby = (hobby) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(h => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const handleSendConnect = (e) => {
    e.preventDefault();
    setConnectSuccess(true);
    setTimeout(() => {
      setConnectSuccess(false);
      setConnectModalProfile(null);
      setConnectMessage('');
    }, 1800);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 75) return 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30';
    return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
  };

  return (
    <div className="container py-8">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AIML Compatibility Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary font-heading">
          {t.roommatesHeading}
        </h2>
        <p className="text-sm sm:text-base text-secondary mt-2">
          {t.roommatesSubtitle}
        </p>
      </div>

      {/* Main Grid: Left Preferences Quiz, Right Ranked Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Preferences Card */}
        <div className="glass-panel p-5 sm:p-6 border border-color h-fit space-y-5">
          <h3 className="text-base font-bold text-primary pb-2 border-b border-color flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-500" />
            <span>My Living Preferences</span>
          </h3>

          {/* Budget */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-muted uppercase">Target Monthly Budget</label>
              <span className="text-xs font-extrabold text-indigo-500">₹{budget.toLocaleString('en-IN')}/mo</span>
            </div>
            <input
              type="range"
              min="5000"
              max="20000"
              step="500"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="cursor-pointer"
            />
          </div>

          {/* Sleep Schedule */}
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">{t.sleepSchedule}</label>
            <div className="grid grid-cols-3 gap-2">
              {['Early Bird', 'Night Owl', 'Flexible'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSleepSchedule(opt)}
                  className={`text-xs py-2 px-1 rounded-lg border font-semibold text-center transition-all ${
                    sleepSchedule === opt
                      ? 'border-indigo-600 bg-indigo-500/15 text-indigo-500'
                      : 'border-color bg-tertiary text-secondary hover:border-focus'
                  }`}
                >
                  {opt === 'Early Bird' && '☀️ Early'}
                  {opt === 'Night Owl' && '🌙 Owl'}
                  {opt === 'Flexible' && '⏰ Flex'}
                </button>
              ))}
            </div>
          </div>

          {/* Food Preference */}
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">{t.dietaryPref}</label>
            <div className="grid grid-cols-2 gap-2">
              {['Vegetarian', 'Jain', 'Eggetarian', 'Non-Vegetarian'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setDietaryPreference(opt)}
                  className={`text-xs py-2 px-2 rounded-lg border font-semibold text-center transition-all ${
                    dietaryPreference === opt
                      ? 'border-indigo-600 bg-indigo-500/15 text-indigo-500'
                      : 'border-color bg-tertiary text-secondary hover:border-focus'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Cleanliness Rating */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-muted uppercase">{t.cleanliness}</label>
              <span className="text-xs font-bold text-indigo-500">{cleanliness} of 5 Stars</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setCleanliness(star)}
                  className={`flex-1 py-1.5 rounded-md text-xs font-bold border transition-all ${
                    cleanliness >= star
                      ? 'bg-amber-400/20 text-amber-500 border-amber-400/40'
                      : 'bg-tertiary border-color text-muted'
                  }`}
                >
                  ★ {star}
                </button>
              ))}
            </div>
          </div>

          {/* Study Routine */}
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">{t.studyHabit}</label>
            <select
              value={studyHabit}
              onChange={(e) => setStudyHabit(e.target.value)}
              className="text-xs font-semibold"
            >
              <option value="Silent Study">Silent Study (Deep Focus)</option>
              <option value="Group Study">Group Study (Collaborative Discussions)</option>
              <option value="Music in Background">Lo-Fi / Background Music</option>
            </select>
          </div>

          {/* Hobbies / Interests */}
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">Interests & Tech Tags</label>
            <div className="flex flex-wrap gap-1.5">
              {allHobbies.map((hobby) => (
                <button
                  key={hobby}
                  type="button"
                  onClick={() => toggleHobby(hobby)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                    selectedHobbies.includes(hobby)
                      ? 'border-indigo-600 bg-indigo-600 text-white font-bold'
                      : 'border-color bg-tertiary text-secondary font-medium hover:border-focus'
                  }`}
                >
                  {hobby}
                </button>
              ))}
            </div>
          </div>

          {/* Recalculate Button */}
          <button
            type="button"
            onClick={fetchMatches}
            disabled={loading}
            className="btn-primary w-full text-sm py-2.5 mt-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Evaluating Model...' : t.calcMatchBtn}</span>
          </button>
        </div>

        {/* Right: Matches Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-base font-bold text-primary">
              Ranked Roommate Matches ({matches.length})
            </h3>
            <span className="text-xs text-muted">Sorted by compatibility algorithms</span>
          </div>

          {matches.map((item) => {
            const score = item.matchScore || 85;
            const scoreBadgeClass = getScoreColor(score);

            return (
              <div 
                key={item._id || item.id}
                className="glass-panel p-5 border border-color hover:border-focus transition-all flex flex-col sm:flex-row gap-4 justify-between"
              >
                {/* Left Info */}
                <div className="flex gap-4">
                  <div className="relative">
                    <img
                      src={item.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                      alt={item.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400 flex-shrink-0"
                    />
                    {item.verifiedBadge && (
                      <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full shadow">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-primary">{item.name}</h4>
                      <span className="text-xs text-muted font-medium">({item.gender}, {item.age} yrs)</span>
                    </div>

                    <p className="text-xs text-indigo-500 font-semibold">
                      🎓 {item.college} • {item.course}
                    </p>

                    <p className="text-xs text-secondary leading-relaxed line-clamp-2 max-w-lg pt-1">
                      "{item.bio}"
                    </p>

                    {/* Quick Lifestyle Pill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <span className="badge bg-tertiary text-secondary text-[10px]">
                        🌙 {item.sleepSchedule}
                      </span>
                      <span className="badge bg-tertiary text-secondary text-[10px]">
                        🥗 {item.dietaryPreference}
                      </span>
                      <span className="badge bg-tertiary text-secondary text-[10px]">
                        ✨ Cleanliness: {item.cleanliness}/5
                      </span>
                      <span className="badge bg-tertiary text-secondary text-[10px]">
                        💰 Target: ₹{Number(item.budget).toLocaleString('en-IN')}/mo
                      </span>
                    </div>

                    {/* Breakdown Reasons */}
                    {item.breakdown && item.breakdown.length > 0 && (
                      <div className="pt-2">
                        <p className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>AI Match Highlights:</span>
                        </p>
                        <div className="flex flex-wrap gap-1 text-[11px] text-muted">
                          {item.breakdown.slice(0, 3).map((b, idx) => (
                            <span key={idx} className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-medium">
                              ✓ {b.reason}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Right: Match Score + Connect Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-color gap-3 flex-shrink-0">
                  <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-1 font-heading font-extrabold ${scoreBadgeClass}`}>
                    <Percent className="w-4 h-4" />
                    <span className="text-lg">{score}%</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider">Match</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setConnectModalProfile(item);
                      setConnectMessage(`Hi ${item.name}! I noticed our ${score}% roommate compatibility on Smart Stay. I am also looking for an accommodation near the campus. Would love to discuss sharing!`);
                    }}
                    className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{t.connectBtn}</span>
                  </button>
                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Connect Modal */}
      {connectModalProfile && (
        <div className="modal-overlay">
          <div className="modal-content max-w-md p-6">
            <div className="flex items-center justify-between pb-3 border-b border-color mb-4">
              <h3 className="text-base font-bold text-primary flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-indigo-500" />
                <span>{t.connectModalTitle}</span>
              </h3>
              <button 
                onClick={() => setConnectModalProfile(null)}
                className="btn-secondary p-1.5 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {connectSuccess ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-primary">Inquiry Sent!</h4>
                <p className="text-xs text-muted">
                  {connectModalProfile.name} has been notified with your profile and compatibility breakdown.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendConnect} className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-tertiary">
                  <img
                    src={connectModalProfile.avatar}
                    alt={connectModalProfile.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-primary">{connectModalProfile.name}</p>
                    <p className="text-[11px] text-muted">{connectModalProfile.college} • {connectModalProfile.preferredCity}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted uppercase mb-1">
                    Introduction Message
                  </label>
                  <textarea
                    rows="4"
                    value={connectMessage}
                    onChange={(e) => setConnectMessage(e.target.value)}
                    required
                    className="text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setConnectModalProfile(null)}
                    className="btn-secondary text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs px-5 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Request</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
