import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { AdminRiskMap } from '../../components/maps/AdminRiskMap';
import { ClusterFarmData } from '../../types';
import { Database, ShieldCheck, Users, MapPin, AlertTriangle, CreditCard, BarChart2 } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { adminClusters } = useApp();
  const [selectedCluster, setSelectedCluster] = useState<ClusterFarmData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClusters = adminClusters.filter(
    (c) =>
      c.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="admin" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Enterprise Insurance Operations</span>
              <h1 className="text-2xl font-extrabold text-white">CropShield Operations Console</h1>
              <p className="text-xs text-slate-400">Regional Telemetry Monitoring & Parametric Trigger Overview</p>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
              Demo Operations Mode
            </span>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-500 font-bold block">ACTIVE FARMERS</span>
              <span className="text-2xl font-extrabold text-white">1,284</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-500 font-bold block">PROTECTED ACRES</span>
              <span className="text-2xl font-extrabold text-emerald-400">8,742</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-500 font-bold block">ACTIVE POLICIES</span>
              <span className="text-2xl font-extrabold text-blue-400">1,106</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-500 font-bold block">RISK EVENTS</span>
              <span className="text-2xl font-extrabold text-amber-400">47</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-500 font-bold block">TRIGGERS</span>
              <span className="text-2xl font-extrabold text-purple-400">19</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-500 font-bold block">SIMULATED PAYOUTS</span>
              <span className="text-2xl font-extrabold text-teal-400">₹8.4L</span>
            </div>
          </div>

          {/* Regional Risk Map */}
          <div className="space-y-3">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" /> Tamil Nadu Regional Farm Risk Clusters Map
            </h3>
            <AdminRiskMap clusters={adminClusters} onSelectCluster={(c) => setSelectedCluster(c)} />
          </div>

          {/* Farm Clusters Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="font-bold text-sm text-white">Monitored Agritech Farm Clusters</h3>
              <input
                type="text"
                placeholder="Search district, crop or farmer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-1.5 text-xs text-white w-64"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-500 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">Farmer</th>
                    <th className="p-3">Farm Name</th>
                    <th className="p-3">District</th>
                    <th className="p-3">Crop</th>
                    <th className="p-3">Risk Score</th>
                    <th className="p-3">Soil %</th>
                    <th className="p-3">NDVI</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredClusters.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedCluster(c)}
                      className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <td className="p-3 font-semibold text-white">{c.farmerName}</td>
                      <td className="p-3">{c.farmName}</td>
                      <td className="p-3 font-mono">{c.district}</td>
                      <td className="p-3 text-emerald-400 font-bold">{c.crop}</td>
                      <td className="p-3 font-bold">{c.riskScore}/100</td>
                      <td className="p-3 font-mono text-cyan-400">{c.soilMoisture}%</td>
                      <td className="p-3 font-mono text-purple-400">{c.ndvi.toFixed(2)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                          c.status === 'TRIGGERED'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : c.status === 'WARNING'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
