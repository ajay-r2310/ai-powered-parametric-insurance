import React from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { Settings, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="admin" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">System Settings</h1>
              <p className="text-xs text-slate-400">Environment Credentials & API Fallback Configurations</p>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
              Demo Mode Configured
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-emerald-400" /> Active Service Adapters Status
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="font-bold text-white block">OpenWeather API Service</span>
                  <span className="text-[10px] text-slate-500">Live API Key or Mock Fallback</span>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Ready (Demo Adapter)
                </span>
              </div>

              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="font-bold text-white block">ESP32 IoT Sensor Telemetry Stream</span>
                  <span className="text-[10px] text-slate-500">Node ESP32-NODE-THJ-88</span>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Stream Active
                </span>
              </div>

              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="font-bold text-white block">Sentinel-2 NDVI Satellite API</span>
                  <span className="text-[10px] text-slate-500">10m Resolution Spectral Feed</span>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Feed Active
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
