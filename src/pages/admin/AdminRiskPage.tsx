import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const AdminRiskPage: React.FC = () => {
  const { adminClusters, aiRisk } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="admin" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Regional Risk Monitor</h1>
              <p className="text-xs text-slate-400">Real-Time Climate Anomaly & Stress Assessment</p>
            </div>
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold px-3 py-1 rounded-full">
              AI Risk Engine Monitoring Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adminClusters.map((c) => (
              <div key={c.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-sm text-white">{c.farmName} ({c.district})</h3>
                  <span className="font-extrabold text-amber-400 text-sm">Risk Score: {c.riskScore}/100</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div><span className="text-slate-500 block">Soil Moisture</span><span className="font-bold text-cyan-400">{c.soilMoisture}%</span></div>
                  <div><span className="text-slate-500 block">NDVI Index</span><span className="font-bold text-purple-400">{c.ndvi.toFixed(2)}</span></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
