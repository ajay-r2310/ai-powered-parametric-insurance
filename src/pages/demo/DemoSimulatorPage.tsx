import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';

import { RiskEventType, EventSeverity } from '../../types';
import { Play, RotateCcw, AlertTriangle, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, Zap, Layers, CreditCard } from 'lucide-react';
import { GaugeChart } from '../../components/ui/GaugeChart';

export const DemoSimulatorPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    runSimulation,
    resetSimulation,
    activeScenario,
    activeSeverity,
    aiRisk,
    weather,
    iot,
    satellite,
    triggers,
    payouts,
    auditLogs,
  } = useApp();

  const [selectedEvent, setSelectedEvent] = useState<RiskEventType>(activeScenario || 'Drought');
  const [selectedSeverity, setSelectedSeverity] = useState<EventSeverity>(activeSeverity || 'High');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    await new Promise((r) => setTimeout(r, 600));
    runSimulation(selectedEvent, selectedSeverity);
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="farmer" />

        <main className="flex-1 p-6 space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-forest-900 border border-amber-500/40 p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 rounded bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
                  CENTERPIECE
                </span>
                <h1 className="text-2xl font-extrabold text-white">Climate Event Simulator</h1>
              </div>
              <p className="text-xs text-amber-200">
                Demonstrate the CropShield AI decision engine to judges in real-time.
              </p>
            </div>

            <button
              onClick={resetSimulation}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" /> Reset to Normal State
            </button>
          </div>

          {/* Interactive Simulation Controls Console */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-6">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" /> 1. Select Climate Anomaly Scenario
            </h3>

            {/* Event Type Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { type: 'Normal', label: 'Normal Climate', desc: 'Optimal rain & soil' },
                { type: 'Drought', label: 'Drought Stress', desc: 'Rainfall deficit & soil depletion' },
                { type: 'Flood', label: 'Flash Flood', desc: 'Heavy rainfall & submersion' },
                { type: 'Extreme Rainfall', label: 'Extreme Rainfall', desc: 'High precipitation intensity' },
                { type: 'Heatwave', label: 'Thermal Heatwave', desc: 'High field temperature' },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => setSelectedEvent(item.type as RiskEventType)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedEvent === item.type
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-lg scale-105'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <span className="font-bold text-xs text-white block mb-1">{item.label}</span>
                  <span className="text-[10px] text-slate-400 leading-tight block">{item.desc}</span>
                </button>
              ))}
            </div>

            {/* Severity Grid */}
            {selectedEvent !== 'Normal' && (
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-300">2. Select Event Severity Level</h4>
                <div className="grid grid-cols-4 gap-3">
                  {['Low', 'Medium', 'High', 'Critical'].map((sev) => (
                    <button
                      key={sev}
                      onClick={() => setSelectedSeverity(sev as EventSeverity)}
                      className={`py-2.5 px-4 rounded-xl border font-bold text-xs transition-colors ${
                        selectedSeverity === sev
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {sev} Severity
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* RUN AI SIMULATION CTA BUTTON */}
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-emerald-400 text-slate-950 font-extrabold text-base py-4 rounded-2xl shadow-2xl transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              {isSimulating ? (
                <>
                  <Zap className="w-5 h-5 animate-spin" /> Recalculating AI Telemetry & Parametric Rules...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-slate-950" /> RUN AI CLIMATE SIMULATION NOW
                </>
              )}
            </button>
          </div>

          {/* Live Reactive Results Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left AI Risk Gauge & Contributions */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-sm text-white">Live AI Risk Output</h3>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  {aiRisk.confidence}% AI Confidence
                </span>
              </div>

              <div className="flex justify-center my-2">
                <GaugeChart score={aiRisk.score} size={180} />
              </div>

              <div className="space-y-2 text-xs">
                {aiRisk.contributions.map((c) => (
                  <div key={c.factor} className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-semibold">{c.factor}:</span>
                    <span className="font-bold text-amber-300">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Synchronous System Reaction Flow */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" /> End-to-End Synchronous Platform Reaction
              </h3>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">1. Weather Rainfall Reading:</span>
                  <span className="font-mono font-bold text-blue-400">{weather.rainfall} mm ({weather.temperature}°C)</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">2. ESP32 Root Soil Moisture:</span>
                  <span className="font-mono font-bold text-cyan-400">{iot.soilMoisture}%</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">3. Sentinel-2 Satellite NDVI:</span>
                  <span className="font-mono font-bold text-purple-400">{satellite.ndvi.toFixed(2)} ({satellite.ndviStatus})</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">4. Parametric Policy Threshold:</span>
                  <span className={`font-bold ${triggers.length > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {triggers.length > 0 ? '✓ THRESHOLD CROSSED' : 'NORMAL / SAFE'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">5. Eligible Sandbox Payout:</span>
                  <span className="font-extrabold text-emerald-400 text-sm">
                    {payouts.length > 0 ? `₹${payouts[0].calculatedPayout.toLocaleString('en-IN')}` : '₹0'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">6. Cryptographic Audit Ledger:</span>
                  <span className="font-mono text-purple-300 font-bold">
                    Block #{auditLogs[0].blockNumber} Verified
                  </span>
                </div>
              </div>

              {payouts.length > 0 && (
                <button
                  onClick={() => navigate('/farmer/payouts')}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs py-3 rounded-xl shadow flex items-center justify-center gap-2 mt-2"
                >
                  <CreditCard className="w-4 h-4" /> Proceed to Sandbox UPI Payout →
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
