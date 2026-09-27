import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Wrench, 
  Scale, 
  FileText, 
  ShieldCheck, 
  Moon, 
  Sun, 
  Globe, 
  UserCheck,
  LayoutDashboard,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  user, 
  onSwitchUser, 
  lang, 
  setLang, 
  theme, 
  toggleTheme, 
  t,
  compareCount,
  onOpenAddListing,
  onOpenAuth,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: t.navExplore, icon: Building2 },
    { id: 'map', label: t.navMap, icon: MapPin },
    { id: 'roommates', label: t.navRoommates, icon: Users },
    { id: 'services', label: t.navServices, icon: Wrench },
    { id: 'compare', label: `${t.navCompare} ${compareCount > 0 ? `(${compareCount})` : ''}`, icon: Scale },
    { id: 'agreements', label: t.navAgreement, icon: FileText }
  ];

  if (user?.role === 'admin') {
    navItems.push({ id: 'admin', label: t.navAdmin, icon: ShieldCheck });
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-[#0b0c10]/80 border-b border-indigo-500/10 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          onClick={() => setCurrentTab('explore')}
        >
          <div className="relative w-10 h-10 rounded-xl bg-indigo-600 shadow-md shadow-indigo-600/20 flex flex-shrink-0 items-center justify-center text-white transition-all duration-300 group-hover:scale-105 group-hover:-rotate-2 border border-indigo-500/30">
            <Building2 className="w-5 h-5 drop-shadow-sm" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight font-heading text-primary whitespace-nowrap">
                {t.brandTitle}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block tracking-wide uppercase mt-0.5 whitespace-nowrap">
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/50 dark:bg-white/5 p-1.5 rounded-2xl border border-slate-200/50 dark:border-white/5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
                  isActive 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'animate-bounce-slight' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Language, Theme, Role Demo Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Add Listing Button for Landlords */}
          {user?.role === 'landlord' && (
            <button 
              onClick={onOpenAddListing}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-4 rounded-lg hidden md:flex items-center gap-2 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Listing</span>
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
            title="Switch Language (English / हिंदी)"
          >
            <span className="font-bold text-xs">{lang === 'en' ? 'HI' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
            title="Toggle Light / Dark Mode"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Authentication / Profile */}
          <div className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300"
                >
                  <img 
                    src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"} 
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-indigo-100 dark:border-indigo-900"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold leading-tight text-slate-800 dark:text-slate-100 truncate max-w-[120px]">{user?.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{user?.role}</p>
                  </div>
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-3 w-64 backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 shadow-2xl rounded-2xl p-2 z-50 text-xs border border-slate-200/50 dark:border-slate-700/50 transform origin-top-right transition-all duration-300"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-2 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl">
                      <p className="font-bold text-base text-slate-800 dark:text-white">{user?.name}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{user?.email}</p>
                      <div className="mt-2 inline-block bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Role: {user?.role}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setCurrentTab(user?.role === 'admin' ? 'admin' : 'dashboard');
                        }}
                        className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-bold transition-colors"
                      >
                        Dashboard
                      </button>
                      
                      <button
                        onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 font-bold transition-colors mt-1"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-all"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full h-[calc(100vh-5rem)] bg-white/95 dark:bg-[#0b0c10]/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col p-6 overflow-y-auto animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="flex flex-col gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-bold transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
