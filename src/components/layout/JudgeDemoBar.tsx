import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Play, ShieldAlert, FileText, Activity, Layers, Database, LayoutDashboard, Cpu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const JudgeDemoBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { runSimulation, resetSimulation, activeScenario } = useApp();

  const steps = [
    { label: 'Landing Page', path: '/', icon: Activity },
    { label: 'Farmer Dashboard', path: '/farmer', icon: LayoutDashboard },
    { label: 'Climate Intelligence', path: '/farmer/climate', icon: Cpu },
    { label: 'Demo Simulator', path: '/demo', icon: Play, highlight: true },
    { label: 'Parametric Triggers', path: '/farmer/risk-events', icon: ShieldAlert },
    { label: 'Sandbox Payouts', path: '/farmer/payouts', icon: FileText },
    { label: 'Blockchain Audit', path: '/admin/blockchain', icon: Layers },
    { label: 'Admin Map', path: '/admin', icon: Database },
  ];

  return (
    <div className="bg-slate-900 border-b border-emerald-500/20 text-xs text-slate-300 py-1.5 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-white tracking-wide uppercase text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
            Hackathon Judge Pitch Mode
          </span>
          {activeScenario !== 'Normal' && (
            <span className="bg-amber-950 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1">
              Active: {activeScenario}
              <button
                onClick={() => resetSimulation()}
                className="ml-1 text-slate-400 hover:text-white underline text-[9px]"
              >
                Reset
              </button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none">
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = location.pathname === s.path;
            return (
              <button
                key={s.path}
                onClick={() => navigate(s.path)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors whitespace-nowrap font-medium ${
                  s.highlight
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-sm'
                    : isActive
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              runSimulation('Drought', 'High');
              navigate('/demo');
            }}
            className="bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded font-semibold text-[11px] transition-colors"
          >
            ⚡ Quick Drought Scenario
          </button>
        </div>
      </div>
    </div>
  );
};
