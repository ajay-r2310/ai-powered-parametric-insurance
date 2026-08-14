import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { Satellite } from 'lucide-react';
import { NDVIChart } from '../../components/charts/NDVIChart';

export const AdminSatellitePage: React.FC = () => {
  const { satellite } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="admin" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Sentinel-2 Satellite NDVI Feed</h1>
              <p className="text-xs text-slate-400">10m Resolution Spectral Canopy Greenness Telemetry</p>
            </div>
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold px-3 py-1 rounded-full">
              Sentinel-2 Feed Live
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Satellite className="w-4 h-4 text-purple-400" /> Sentinel-2 NDVI Index Stream
            </h3>
            <NDVIChart data={satellite.historicalNDVI} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
