import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { FarmMap } from '../../components/maps/FarmMap';
import { MapPin, Calendar, Radio, Layers, CheckCircle2 } from 'lucide-react';

export const FarmDetailsPage: React.FC = () => {
  const { farm, iot, aiRisk } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="farmer" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">{farm.name}</h1>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{farm.location.address}, {farm.location.district}, {farm.location.state}</span>
              </p>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
              Verified Farm Plot
            </span>
          </div>

          <FarmMap farm={farm} iot={iot} riskScore={aiRisk.score} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
              <span className="text-xs text-slate-400 font-semibold block">Crop Type</span>
              <p className="text-xl font-extrabold text-white">{farm.cropType}</p>
              <p className="text-xs text-slate-500">Established: {farm.establishedDate}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
              <span className="text-xs text-slate-400 font-semibold">Total Farm Acreage</span>
              <p className="text-xl font-extrabold text-emerald-400">{farm.sizeAcres} Acres</p>
              <p className="text-xs text-slate-500">Cauvery Delta Sector</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
              <span className="text-xs text-slate-400 font-semibold">Field Sensor Node</span>
              <p className="text-xl font-extrabold text-cyan-400">{farm.sensorId}</p>
              <p className="text-xs text-emerald-400 font-semibold">● Live Telemetry Online</p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
