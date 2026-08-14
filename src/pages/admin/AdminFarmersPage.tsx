import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { User, CheckCircle2 } from 'lucide-react';

export const AdminFarmersPage: React.FC = () => {
  const { adminClusters } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="admin" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Registered Farmers & Acreage</h1>
              <p className="text-xs text-slate-400">Directory of Monitored Smallholder Agriculture Plots</p>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
              {adminClusters.length} Active Farm Clusters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adminClusters.map((c) => (
              <div key={c.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base text-white">{c.farmerName}</h3>
                    <p className="text-xs text-slate-400">{c.farmName} ({c.district})</p>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                  <div><span className="text-slate-500 block">Crop</span><span className="font-bold text-emerald-400">{c.crop}</span></div>
                  <div><span className="text-slate-500 block">Acreage</span><span className="font-bold text-white">{c.acres} Acres</span></div>
                  <div><span className="text-slate-500 block">Risk Score</span><span className="font-bold text-amber-400">{c.riskScore}/100</span></div>
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
