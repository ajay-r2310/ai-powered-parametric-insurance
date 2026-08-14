import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { Radio } from 'lucide-react';

export const AdminIoTPage: React.FC = () => {
  const { iot, farm } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="admin" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">ESP32 Field IoT Hardware Nodes</h1>
              <p className="text-xs text-slate-400">In-situ Soil Moisture & Water Depth Sensors Network</p>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Node Online
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" /> Node: {farm.sensorId}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div><span className="text-slate-500 block">Soil Moisture</span><span className="font-bold text-cyan-400 text-sm">{iot.soilMoisture}%</span></div>
              <div><span className="text-slate-500 block">Water Level</span><span className="font-bold text-white text-sm">{iot.waterLevel} cm</span></div>
              <div><span className="text-slate-500 block">Battery Level</span><span className="font-bold text-emerald-400 text-sm">{iot.batteryLevel}%</span></div>
              <div><span className="text-slate-500 block">Signal Strength</span><span className="font-mono text-slate-300 text-sm">{iot.signalStrength} dBm</span></div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
