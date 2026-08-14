import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Bell, User, Cpu, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { farmer, notifications, markNotificationRead } = useApp();
  const [showNotifs, setShowNotifs] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const isFarmerRoute = location.pathname.startsWith('/farmer');
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-8 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-forest-900 flex items-center justify-center p-0.5 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-white tracking-tight">CROP</span>
              <span className="font-extrabold text-lg text-emerald-400 tracking-tight">SHIELD</span>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Protecting Every Acre with Intelligence</p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/farmer"
            className={`text-sm font-medium transition-colors ${
              isFarmerRoute ? 'text-emerald-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Farmer Console
          </Link>
          <Link
            to="/farmer/climate"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/farmer/climate' ? 'text-emerald-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Climate Intelligence
          </Link>
          <Link
            to="/demo"
            className={`text-sm font-medium flex items-center gap-1.5 text-amber-400 hover:text-amber-300 ${
              location.pathname === '/demo' ? 'font-bold underline' : ''
            }`}
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            Demo Simulator
          </Link>
          <Link
            to="/admin"
            className={`text-sm font-medium transition-colors ${
              isAdminRoute ? 'text-emerald-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Admin Operations
          </Link>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          {/* Notification Bell Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-slate-950 font-extrabold text-[10px] rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 p-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="font-bold text-sm text-white">Notifications</h4>
                  <span className="text-xs text-slate-400">{notifications.length} total</span>
                </div>
                <div className="max-h-72 overflow-y-auto space-y-2 py-2">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-500 py-4 text-center">No alerts at present.</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3 rounded-lg border transition-colors cursor-pointer text-xs ${
                          n.read
                            ? 'bg-slate-950/40 border-slate-800 text-slate-400'
                            : 'bg-emerald-950/30 border-emerald-500/30 text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold mb-1">
                          <span className={n.severity === 'ALERT' ? 'text-amber-400' : 'text-emerald-400'}>
                            {n.title}
                          </span>
                          <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-300 leading-snug">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
                <button
                  onClick={() => navigate('/farmer/notifications')}
                  className="w-full text-center text-xs text-emerald-400 hover:underline pt-2 border-t border-slate-800"
                >
                  View Notification Center
                </button>
              </div>
            )}
          </div>

          {/* Profile pill */}
          <div
            onClick={() => navigate('/farmer/profile')}
            className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700/80 p-1.5 pr-3 rounded-xl border border-slate-700/50 cursor-pointer transition-colors"
          >
            <img
              src={farmer.avatar}
              alt={farmer.name}
              className="w-7 h-7 rounded-lg object-cover border border-emerald-500/30"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-white leading-tight">{farmer.name}</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" /> Protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
