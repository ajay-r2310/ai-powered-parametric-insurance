import React from 'react';
import { Shield, ExternalLink, Activity, Github, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-extrabold text-white text-base">CROPSHIELD AI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Protecting every acre with multi-source intelligence, automated parametric triggers, sandbox UPI payouts, and transparent blockchain audit records.
          </p>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Platform Demo</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/farmer" className="hover:text-emerald-400">Farmer Dashboard</Link></li>
            <li><Link to="/farmer/climate" className="hover:text-emerald-400">Climate Intelligence</Link></li>
            <li><Link to="/demo" className="text-amber-400 hover:text-amber-300">Climate Event Simulator</Link></li>
            <li><Link to="/admin/blockchain" className="hover:text-emerald-400">Blockchain Audit Ledger</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Data Integrations</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-blue-400" /> OpenWeather API Adapter</li>
            <li className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-emerald-400" /> ESP32 Field IoT Telemetry</li>
            <li className="flex items-center gap-1.5"><ExternalLink className="w-3.5 h-3.5 text-purple-400" /> Sentinel-2 NDVI Satellite</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Hackathon Positioning</h4>
          <p className="text-xs text-slate-400 leading-relaxed bg-slate-900 border border-slate-800 p-3 rounded-lg">
            This application is a <strong>Hackathon Demonstration Prototype</strong>. All payouts are executed in a sandbox environment and blockchain blocks represent a tamper-proof audit trail ledger prototype.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 CropShield AI Platform. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            ● Demo Mode Active
          </span>
          <Link to="/demo" className="text-slate-400 hover:text-white">Run Pitch Simulation</Link>
        </div>
      </div>
    </footer>
  );
};
