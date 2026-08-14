import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  Cpu,
  AlertTriangle,
  CreditCard,
  Bell,
  User,
  Layers,
  Sparkles,
  Database,
  Radio,
  Satellite,
  BarChart3,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  mode: 'farmer' | 'admin';
}

export const Sidebar: React.FC<SidebarProps> = ({ mode }) => {
  const location = useLocation();

  const farmerLinks = [
    { label: 'Overview', path: '/farmer', icon: LayoutDashboard },
    { label: 'Farm Details', path: '/farmer/farm', icon: MapPin },
    { label: 'My Policy', path: '/farmer/policy', icon: ShieldCheck },
    { label: 'Climate Intelligence', path: '/farmer/climate', icon: Cpu },
    { label: 'Risk Events & Triggers', path: '/farmer/risk-events', icon: AlertTriangle },
    { label: 'Payout Center', path: '/farmer/payouts', icon: CreditCard },
    { label: 'Notification Center', path: '/farmer/notifications', icon: Bell },
    { label: 'Farmer Profile', path: '/farmer/profile', icon: User },
  ];

  const adminLinks = [
    { label: 'Operations Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Farmers & Acreage', path: '/admin/farmers', icon: User },
    { label: 'Active Policies', path: '/admin/policies', icon: ShieldCheck },
    { label: 'Regional Risk Monitor', path: '/admin/risk', icon: AlertTriangle },
    { label: 'Parametric Triggers', path: '/admin/triggers', icon: BarChart3 },
    { label: 'Payout Settlements', path: '/admin/payouts', icon: CreditCard },
    { label: 'ESP32 IoT Nodes', path: '/admin/iot', icon: Radio },
    { label: 'Sentinel NDVI Feed', path: '/admin/satellite', icon: Satellite },
    { label: 'Blockchain Ledger', path: '/admin/blockchain', icon: Layers },
    { label: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  const links = mode === 'farmer' ? farmerLinks : adminLinks;

  return (
    <aside className="w-64 bg-slate-900/70 backdrop-blur-md border-r border-slate-800 min-h-[calc(100vh-6rem)] p-4 hidden md:block">
      <div className="mb-6 px-2">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
          {mode === 'farmer' ? 'Farmer Console' : 'Enterprise Admin'}
        </span>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Simulator Quick Launch Card */}
      <div className="mt-8 p-3.5 rounded-xl bg-gradient-to-b from-amber-950/40 to-slate-900 border border-amber-500/30">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          Judge Pitch Simulator
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          Trigger live climate events and observe full platform reaction.
        </p>
        <NavLink
          to="/demo"
          className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-1.5 rounded-lg transition-colors shadow"
        >
          Launch Simulator
        </NavLink>
      </div>
    </aside>
  );
};
