import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Globe,
  Bell,
  Menu,
  X,
  ChevronDown,
  User,
  ShieldCheck,
  LogOut,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    language,
    setLanguage,
    activeRoute,
    setActiveRoute,
    notifications,
    t,
    logout,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadNotifs = notifications.filter(
    (n) => (currentUser ? n.userId === currentUser.id : false) && !n.read
  );

  const navItems = [
    { label: t('navHome'), route: 'home' },
    { label: t('navFindTutor'), route: 'find-tutor' },
    { label: t('navServices'), route: 'services' },
    { label: t('navPricing'), route: 'pricing' },
    { label: t('navHowItWorks'), route: 'how-it-works' },
    { label: t('navAbout'), route: 'about' },
    { label: t('becomeTutorCTA'), route: 'become-tutor' },
    { label: t('navContact'), route: 'contact' },
  ];

  const secondaryNavItems = [
    { label: t('navTestimonials'), route: 'testimonials' },
    { label: 'Resources & Blog', route: 'blog' },
    { label: 'Learning Tips', route: 'learning-tips' },
    { label: 'FAQ Assistant', route: 'faq' },
    { label: 'Careers', route: 'careers' },
  ];

  const handleNav = (route: string) => {
    setActiveRoute(route);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single element Brand Wordmark (Constitution Top Bar Contract) */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3B66]"
        >
          <div className="w-11 h-11 rounded-xl bg-[#0D3B66] text-white flex items-center justify-center shadow-md shadow-[#0D3B66]/20 group-hover:bg-[#2563EB] transition-colors">
            <GraduationCap className="w-6 h-6 text-[#F4B400]" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0D3B66] block leading-none">
              PRO TUTORIAL SERVICE
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-[#2563EB] uppercase block mt-1">
              Addis Ababa & Regional Ethiopia
            </span>
          </div>
        </button>

        {/* Zone 2: Clean Text Navigation Links + More Dropdown */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-700">
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => handleNav(item.route)}
              className={`hover:text-[#2563EB] transition-colors cursor-pointer relative py-1 focus:outline-none whitespace-nowrap ${
                activeRoute === item.route
                  ? 'text-[#0D3B66] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0D3B66]'
                  : ''
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* More menu */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 hover:text-[#2563EB] transition-colors cursor-pointer py-1 text-slate-600 font-semibold"
            >
              <span>More</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {secondaryNavItems.map((sub) => (
                  <button
                    key={sub.route}
                    onClick={() => handleNav(sub.route)}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors block"
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: 1-2 Primary Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200"
            title="Switch Language (English / አማርኛ)"
          >
            <Globe className="w-3.5 h-3.5 text-[#0D3B66]" />
            <span>{language === 'en' ? 'አማርኛ' : 'EN'}</span>
          </button>

          {/* Notifications */}
          {currentUser && (
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#F25C54] rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Notifications</span>
                    <span className="text-[11px] text-slate-500">{unreadNotifs.length} new</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-slate-50 py-1">
                    {unreadNotifs.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 text-center">No new notifications</p>
                    ) : (
                      unreadNotifs.slice(0, 5).map((n) => (
                        <div key={n.id} className="py-2 text-xs">
                          <p className="font-semibold text-slate-800">{n.title}</p>
                          <p className="text-slate-500 text-[11px] mt-0.5 line-clamp-2">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setNotifDropdownOpen(false);
                      handleNav('dashboard');
                    }}
                    className="w-full mt-2 text-center text-xs font-semibold text-[#0D3B66] hover:underline"
                  >
                    View in Dashboard
                  </button>
                </div>
              )}
            </div>
          )}

          {/* User Account / Login Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#0D3B66] text-white flex items-center justify-center text-[11px] font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline max-w-28 truncate">{currentUser.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded">
                      Role: {currentUser.role}
                    </span>
                  </div>

                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => handleNav('admin-dashboard')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#0D3B66]" />
                      <span>Admin Management</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleNav('dashboard')}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>My Dashboard</span>
                  </button>

                  <div className="border-t border-slate-100 my-1"></div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-[#F25C54] hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('login')}
                className="hidden sm:inline-flex px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0D3B66] transition-colors"
              >
                {t('navLogin')}
              </button>
              {/* Tomato / Coral CTA Button */}
              <button
                onClick={() => handleNav('find-tutor')}
                className="px-4 py-2.5 text-xs font-bold text-white bg-[#F25C54] hover:bg-[#e04a42] rounded-xl shadow-md shadow-[#F25C54]/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                {t('findTutorCTA')}
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`w-full text-left px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                  activeRoute === item.route
                    ? 'bg-[#0D3B66] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-1">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              More Educational Resources
            </p>
            {secondaryNavItems.map((sub) => (
              <button
                key={sub.route}
                onClick={() => handleNav(sub.route)}
                className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-[#2563EB] block"
              >
                {sub.label}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
            {!currentUser && (
              <>
                <button
                  onClick={() => handleNav('login')}
                  className="w-full py-2.5 text-center text-xs font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50"
                >
                  {t('navLogin')}
                </button>
                <button
                  onClick={() => handleNav('find-tutor')}
                  className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#F25C54] hover:bg-[#e04a42] rounded-xl shadow-sm"
                >
                  {t('findTutorCTA')}
                </button>
              </>
            )}
            <button
              onClick={() => handleNav('become-tutor')}
              className="w-full py-2.5 text-center text-xs font-semibold text-[#0D3B66] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors"
            >
              {t('becomeTutorCTA')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
