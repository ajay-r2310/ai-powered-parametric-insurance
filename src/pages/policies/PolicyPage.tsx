import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { ShieldCheck, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PolicyPage: React.FC = () => {
  const { policy, farm } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="farmer" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400">Policy ID: {policy.id}</span>
              <h1 className="text-2xl font-extrabold text-white">CropShield Paddy Climate Protection</h1>
              <p className="text-xs text-slate-400">Active Coverage for {farm.name} (4.2 Acres)</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3.5 py-1.5 rounded-full">
                ● ACTIVE POLICY
              </span>
              <button
                onClick={() => navigate('/farmer/policy/create')}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl"
              >
                Setup New Policy
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">Coverage Amount</span>
              <p className="text-3xl font-extrabold text-emerald-400">₹{policy.coverageAmount.toLocaleString('en-IN')}</p>
              <p className="text-xs text-slate-500 mt-1">Parametric Severity Scale</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">Annual Premium</span>
              <p className="text-3xl font-extrabold text-white">₹{policy.premiumAmount.toLocaleString('en-IN')}</p>
              <p className="text-xs text-emerald-400 font-semibold mt-1">Subsidized Agritech Rate</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">Insurance Period</span>
              <p className="text-base font-extrabold text-white">{policy.startDate} to {policy.endDate}</p>
              <p className="text-xs text-slate-500 mt-1">Kharif Season Coverage</p>
            </div>
          </div>

          {/* Parametric Thresholds Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Active Parametric Trigger Thresholds
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400">Drought Trigger Conditions</h4>
                <div className="space-y-1 text-slate-300">
                  <p>• Rainfall &lt; {policy.thresholds.minRainfallMm ?? 15} mm</p>
                  <p>• Soil Moisture &lt; {policy.thresholds.minSoilMoisturePercentage ?? 25}%</p>
                  <p>• NDVI Canopy Decline &gt; 15%</p>
                  <p>• Minimum Anomaly Duration: {policy.thresholds.minDurationDays} Days</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-blue-400">Flood Trigger Conditions</h4>
                <div className="space-y-1 text-slate-300">
                  <p>• Rainfall &gt; 90 mm in 24 hours</p>
                  <p>• Paddy Water Level &gt; {policy.thresholds.maxWaterLevelCm ?? 60} cm</p>
                  <p>• Minimum Anomaly Duration: 1 Day</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
